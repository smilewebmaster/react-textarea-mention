import React, { useState, useRef, Fragment } from "react";
import "./assets/style.css";





const Mention = ({ symbol = "@", styles = {}, data = [], field = 'username', onFieldsChange, onChange }) => {
  const textAreaRef = useRef();
  const [id] = useState("mention-" +
  Date.now().toString() +
  Math.random()
    .toString(36)
    .slice(-8))
  const [lookupId] = useState("lookup-" +  Date.now().toString() +
  Math.random()
    .toString(36)
    .slice(-8));

  const [startAt, setStartAt] = useState(-1);
  const [mentionSize, setMentionSize] = useState(0);
  const [mentionList, setMentionList] = useState([]);
  const [lookupStyles, setLookupStyles] = useState({});





  const peopleClass = "mention-li-nt";

  const GetCoords = () => {
    let replica = document.createElement('div');
    const textArea = textAreaRef.current;
      const copyStyle = getComputedStyle(textArea);
      for (const prop of copyStyle) {
        replica.style[prop] = copyStyle[prop];
      }
      replica.style.height = 'auto';
      replica.style.width = 'auto';
      let span = document.createElement('span');
      replica.appendChild(span);
      let content = textArea.value.substr(0, textArea.selectionStart);
      let contentLines = content.split(/[\n\r]/g);
      let currentline = content.substr(0, content.selectionStart).split(/[\n\r]/g)
        .length;
      let replicaContent = '';
      contentLines.map((l, i) => {
        if (i === currentline - 1 && i < contentLines.length) {
          replicaContent += contentLines[i];
          return;
        }
        replicaContent += '\n';
      });
      span.innerHTML = replicaContent.replace(/\n$/, '\n');
      document.body.appendChild(replica);
      const { offsetWidth: spanWidth, offsetHeight: spanHeight } = span;
      document.body.removeChild(replica);
      return {
        x: spanWidth + textArea.offsetLeft,
        y: spanHeight + textArea.offsetTop,
      };
  }

  const setupLookup = () => {
      let {x, y} = GetCoords(textAreaRef.current);
      setLookupStyles({position: 'absolute', left: `${x}px`, top: `${y}px`});
  }

  const hideLookup = () =>  setMentionList([]);

  const extractMention = value => {
    let mention = value.substring(startAt, value.length);
    const whiteSpaceIndex = mention.indexOf(" "),
        endAt = whiteSpaceIndex > -1 ? whiteSpaceIndex : value.length;
      mention = mention.substring(0, endAt);
      return mention.toLowerCase();
  }

  const insertNameIntoInput = e => {
    const textArea = textAreaRef.current;
    let element = e.target.className === peopleClass ? e.target : e.target.parentElement;
    const first = textArea.value.substr(0, startAt);
    const last = textArea.value.substr(
      startAt + mentionSize,
      textArea.value.length
    );
    const content = `${first}${element.dataset[field]}${last}`;
    textArea.value = content;
    setMentionSize(element.dataset[field].length);
    textArea.focus();
    if (onChange) onChange(textArea.value);
    hideLookup();
  }


  const updateMentionList = () => {
    const textArea = textAreaRef.current;
    const mention = extractMention(textArea.value);

    const filteredData = data.filter(d => d[field].toLowerCase().includes(mention));

    setMentionList(filteredData);
    if (onChange) onChange(textArea.value);
   if (onFieldsChange) onFieldsChange(textAreaRef.current.value);
  }


  const handleKeyUp = e => {
        const {value, selectionStart: start} = e.target;
        const character = value.substring(start - 1, start);
        if (onChange) onChange(value)

      if (character === symbol) {
        setStartAt(start);
        setupLookup();
        return;
      }
      if (character === " " || value.trim() === "") {
        setStartAt(-1);
        hideLookup();
        return;
      }
      if (startAt > -1) {
        updateMentionList();
        setMentionSize(mentionSize + 1);
        return;
      }
  }

  return (
    <div>
      <div id={lookupId} className="mention-lookup-nt" style={lookupStyles}>
        <ul>
        {mentionList.map((mention, i) => {
          const dataProp = {[`data-${field}`]: mention[field]};
          return (
            <li key={i} className={peopleClass} {...dataProp} onClick={insertNameIntoInput}>
                <div>{symbol}{mention[field]}</div>
            </li>
          )
        })}
        </ul>
      </div>
       <textarea
      id={id}
      ref={textAreaRef}
      onKeyUp={handleKeyUp}
      onClick={hideLookup}
      cols="30"
      rows="10"
    ></textarea>
    </div>
   
  );
};
export default Mention;

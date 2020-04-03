import React, { useState, useRef } from "react";
import GetCoords from "./misc/getcoords";
import extractMention from "./misc/extract-mention";
import generateId from "./misc/generate-id";
import "./assets/style.css";

const Mention = ({
  symbol = "@",
  cssClass,
  data = [],
  field = "username",
  onChange,
  renderContent,
  textAreaProps = {}
}) => {
  const textAreaRef = useRef();
  const [id] = useState("mention-" + generateId());
  const [lookupId] = useState("lookup-" + generateId());

  const [startAt, setStartAt] = useState(-1);
  const [mentionSize, setMentionSize] = useState(0);
  const [mentionList, setMentionList] = useState([]);
  const [lookupStyles, setLookupStyles] = useState({});

  const peopleClass = "mention-li-nt";

  const setupLookup = () => {
    let { x, y } = GetCoords(textAreaRef.current);
    setLookupStyles({ position: "absolute", left: `${x}px`, top: `${y}px` });
  };

  const hideLookup = () => setMentionList([]);

  const insertNameIntoInput = (e, dataField) => {
    const textArea = textAreaRef.current;
    const first = textArea.value.substr(0, startAt);
    const last = textArea.value.substr(
      startAt + mentionSize,
      textArea.value.length
    );
    const content = `${first}${dataField}${last}`;
    textArea.value = content;
    setMentionSize(dataField.length);
    textArea.focus();
    if (onChange) onChange(textArea.value);
    hideLookup();
  };

  const updateMentionList = () => {
    const textArea = textAreaRef.current;
    const mention = extractMention(textArea.value, startAt);

    const filteredData = data.filter(d =>
      d[field].toLowerCase().includes(mention)
    );

    setMentionList(filteredData);
    if (onChange) onChange(textArea.value);
  };

  const handleKeyUp = e => {
    const { value, selectionStart: start } = e.target;
    const character = value.substring(start - 1, start);
    if (onChange) onChange(value);

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
  };

  return (
    <div>
      <div
        id={lookupId}
        className={`mention-lookup-nt ${cssClass}`}
        style={lookupStyles}
      >
        <ul>
          {mentionList.map((mention, i) => {
            return (
              <li
                key={i}
                className={peopleClass}
                onClick={e => insertNameIntoInput(e, mention[field])}
              >
                {renderContent ? (
                  renderContent(mention)
                ) : (
                  <div>
                    {symbol}
                    {mention[field]}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <textarea
        {...textAreaProps}
        id={id}
        ref={textAreaRef}
        onKeyUp={handleKeyUp}
        onClick={hideLookup}
      ></textarea>
    </div>
  );
};
export default Mention;

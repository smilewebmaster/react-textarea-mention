const mention = (config) => {
    init(config);
    let startAt = -1;
    let mentionSize = 0;
    const lookupClass = "mention-lookup-nt";
    const peopleClass = "mention-li-nt";
    function init(config) {
      if (config === undefined) {
        error();
        return;
      }
      if (config.id === undefined || config.people === undefined) {
        error();
        return;
      }
      if (config.symbol === undefined) {
        config.symbol = "@";
      }
      document
        .getElementById(config.id)
        .addEventListener("keyup", (e) => mentionEvent(e));
      document
        .getElementById(config.id)
        .addEventListener("click", (e) => hideLookup());
    }
    function mentionEvent(e) {
      let value = e.target.value,
        start = e.target.selectionStart,
        character = value.substring(start - 1, start);
      if (character === config.symbol) {
        startAt = start;
        setupLookup(e.target);
        return;
      }
      if (character === " " || value.trim() === "") {
        startAt = -1;
        hideLookup();
        return;
      }
      if (startAt > -1) {
        setMentionList(e.target);
        mentionSize++;
        return;
      }
    }
    function extractMention(value) {
      let mention = value.substring(startAt, value.length),
        whiteSpaceIndex = mention.indexOf(" "),
        endAt = whiteSpaceIndex > -1 ? whiteSpaceIndex : value.length;
      mention = mention.substring(0, endAt);
      return mention.toLowerCase();
    }
    function setMentionList(textArea) {
      const mention = extractMention(textArea.value);
      const li = (
        people
      ) => `<li class="${peopleClass}" data-username="${people.username}">
          <img src=${people.image}>
          <div>${people.name}</div>
          <div>@${people.username}</div>		
      </li>`;
      const items = config.people
        .filter((people) => people.username.toLowerCase().includes(mention))
        .map((people) => li(people));
      if (!items.length) {
        hideLookup();
        return;
      }
      fillLookup(textArea, `<ul>${items.join("")}</ul>`);
    }
    function GetCoords(textArea) {
      let replica = document.createElement("div");
      const copyStyle = getComputedStyle(textArea);
      for (const prop of copyStyle) {
        replica.style[prop] = copyStyle[prop];
      }
      replica.style.height = "auto";
      replica.style.width = "auto";
      let span = document.createElement("span");
      replica.appendChild(span);
      let content = textArea.value.substr(0, textArea.selectionStart);
      let contentLines = content.split(/[\n\r]/g);
      let currentline = content.substr(0, content.selectionStart).split(/[\n\r]/g)
        .length;
      let replicaContent = "";
      contentLines.map((l, i) => {
        if (i === currentline - 1 && i < contentLines.length) {
          replicaContent += contentLines[i];
          return;
        }
        replicaContent += "\n";
      });
      span.innerHTML = replicaContent.replace(/\n$/, "\n\001");
      document.body.appendChild(replica);
      const { offsetWidth: spanWidth, offsetHeight: spanHeight } = span;
      document.body.removeChild(replica);
      return {
        x: spanWidth + textArea.offsetLeft,
        y: spanHeight + textArea.offsetTop,
      };
    }
    function setupLookup(textArea) {
      let lookupElement = document.getElementsByClassName(lookupClass);
      let lookup;
      if (lookupElement.length) {
        lookup = lookupElement[0];
      } else {
        lookup = document.createElement("div");
        lookup.className = lookupClass;
        document.body.insertBefore(lookup, textArea.nextSibling);
      }
      let coords = GetCoords(textArea);
      lookup.style.position = "absolute";
      lookup.style.left = coords.x + "px";
      lookup.style.top = coords.y + "px";
      lookup.style.zIndex = "5000";
    }
    function fillLookup(textArea, content) {
      let lookup = document.getElementsByClassName(lookupClass);
      lookup[0].innerHTML = content;
      bindLookupClickEvent(textArea);
      if (lookup[0].style.display === "none") {
        lookup[0].style.display = "inline";
      }
    }
    function hideLookup() {
      let lookup = document.getElementsByClassName(lookupClass);
      if (lookup.length) {
        if (lookup[0].style.display !== "none") {
          lookup[0].style.display = "none";
        }
      }
    }
    function insertNameIntoInput(e, textArea) {
      let element =
        e.target.className === peopleClass ? e.target : e.target.parentElement;
      const first = textArea.value.substr(0, startAt);
      const last = textArea.value.substr(
        startAt + mentionSize,
        textArea.value.length
      );
      const content = `${first}${element.dataset.username}${last}`;
      textArea.value = content;
      mentionSize = element.dataset.username.length;
      hideLookup();
    }
    function bindLookupClickEvent(textArea) {
      const list = document.getElementsByClassName(peopleClass);
      Array.from(list).forEach((element) => {
        element.addEventListener("click", (e) =>
          insertNameIntoInput(e, textArea)
        );
      });
    }
    function error() {
      console.error("@mention: missing parameters");
    }
  };
  
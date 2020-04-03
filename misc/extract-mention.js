const extractMention = (value, startAt) => {
    let mention = value.substring(startAt, value.length);
    const whiteSpaceIndex = mention.indexOf(" "),
        endAt = whiteSpaceIndex > -1 ? whiteSpaceIndex : value.length;
      mention = mention.substring(0, endAt);
      return mention.toLowerCase();
}

export default extractMention;
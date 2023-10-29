const generateString = (prefix, sufix) =>
  `${prefix}${Date.now()}${sufix}`;

export default generateString;
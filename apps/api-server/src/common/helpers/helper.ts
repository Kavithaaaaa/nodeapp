export const getByValue = (arr, value) => {
  let o;

  for (let i = 0, iLen = arr.length; i < iLen; i++) {
    o = arr[i];

    for (const p in o) {
      if (o.hasOwnProperty(p) && o[p] == value) {
        return o;
      }
    }
  }
};

export const generateNewFileName = (str) => {
  if (str) {
    const fileName = str.substring(0, str.lastIndexOf('.')) || str;
    return `${fileName}-${Date.now()}.${str.split('.').pop()}`;
  }
  return '';
};

/**
 * Convert string to array and remove white space
 *
 * @param str String
 * @returns array
 */
export const trimStringArray = (str) => {
  return str.split(',').map((i) => i.trim());
};

export const isEmptyObj = (obj) => {
  return typeof obj === 'undefined' || obj === null;
};

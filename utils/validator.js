/**
 *
 * @param {string} str
 * @return boolean
 */
export function isEmpty(str) {
  return str.replace(/\s+/g, '').length === 0;
}

export default {
  isEmpty
};

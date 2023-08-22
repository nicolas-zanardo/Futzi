/**
 * @function titleCase
 * @description capitalize string
 * @param str
 * @return {string}
 */
exports.titleCase = (str) => {
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

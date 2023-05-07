/**
 * haveKeyNotDefined()
 * @description Find all key null or undefined
 * @example obj.findIt test boolean obj.value[] list all objects key are not undefined or null
 * @param obj any
 * @returns {{findIt: boolean, value: keyObj[]}}
 */
exports.haveKeyNotDefined = (obj) => {
    let keyNotDefined = {findIt:false, value:[]};
    for (const [key, value] of Object.entries(obj)) {
        if(!value) {
            keyNotDefined.findIt = true;
            keyNotDefined.value.push(key);
        }
    }
    return keyNotDefined;
};
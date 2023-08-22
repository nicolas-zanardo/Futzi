/**
 * @class GenerateToken
 * @static
 * @description generate token
 */
class GenerateToken {

    tokenURL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_".split("");
    tokenPassword = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_*/%~?.\\'\"$#€@!^<>".split("");

    /**
     * @method create
     * @description generate token
     * @param length size token
     * @param tokenArray ex : tokenURL<string[]>
     * @return {string}
     */
    create(length, tokenArray){
        const token = [];
        for (let i=0; i<length; i++) {
            let j = (Math.random() * (tokenArray.length-1)).toFixed(0);
            token[i] = tokenArray[j];
        }
        return token.join("");
    }
}

module.exports = {GenerateToken};


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeByJwt = authorizeByJwt;
exports.isSameFloat = isSameFloat;
const googleapis_1 = require("googleapis");
async function authorizeByJwt(pathJwtFile, scopes) {
    // 参考: https://github.com/googleapis/google-api-nodejs-client/issues/1699#issuecomment-1770598231
    const jwt = new googleapis_1.google.auth.JWT({
        keyFile: pathJwtFile,
        scopes: scopes,
    });
    await jwt.authorize();
    return jwt;
}
function isSameFloat(left, right) {
    const lengths = [left, right].map(text => {
        const index = text.indexOf('.');
        if (index < 0) {
            return 0;
        }
        const lastIndex = text.length - 1;
        return lastIndex - index;
    });
    const digits = Math.max(...lengths);
    const lValue = parseFloat(left).toFixed(digits);
    const rValue = parseFloat(right).toFixed(digits);
    return lValue === rValue;
}

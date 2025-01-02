import {google} from 'googleapis';

export async function authorizeByJwt(
  pathJwtFile: string,
  scopes?: string | string[],
) {
  // 参考: https://github.com/googleapis/google-api-nodejs-client/issues/1699#issuecomment-1770598231
  const jwt = new google.auth.JWT({
    keyFile: pathJwtFile,
    scopes: scopes,
  });
  await jwt.authorize();
  return jwt;
}

export function isSameFloat(left: string, right: string) {
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

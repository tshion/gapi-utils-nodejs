import { google } from 'googleapis';
import { existsSync } from 'node:fs';
import { extname } from 'node:path';

/**
 * [Google Sheets API](https://developers.google.com/sheets) の操作クライアント生成
 *
 * @param {string} pathJwtFile Google サービスアカウント認証情報(JSON 形式) のファイルパス
 * @param {boolean} [canWrite=false] 書き込み権限を要求するかどうか
 */
export async function createGSheetsApiClient(
  pathJwtFile,
  canWrite = false,
) {
  if (!existsSync(pathJwtFile) || extname(pathJwtFile) !== '.json') {
    throw Error(`サービスアカウント認証情報(JSON 形式) が見当たりません: ${pathJwtFile}`);
  }

  // 参考: https://github.com/googleapis/google-api-nodejs-client/issues/1699#issuecomment-1770598231
  const scopeSuffix = canWrite ? '' : '.readonly';
  const jwt = new google.auth.JWT({
    keyFile: pathJwtFile,
    scopes: [
      `https://www.googleapis.com/auth/spreadsheets${scopeSuffix}`,
    ]
  });
  await jwt.authorize();
  return google.sheets({ version: 'v4', auth: jwt });
}

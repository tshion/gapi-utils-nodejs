/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {google, sheets_v4} from 'googleapis';
import {authorizeByJwt, isSameFloat} from './core.util';

/**
 * Utilities for [Google Sheets API](https://developers.google.com/sheets)
 */
export class SheetsUtil {
  /**
   * Create a client for the Google Sheets API
   *
   * @param pathJwtFile Path to the JSON Web Token file for google service account credentials.
   * @param canWrite Whether to allow writing or not.
   */
  public static async createClient(pathJwtFile: string, canWrite = false) {
    const scopeSuffix = canWrite ? '' : '.readonly';
    const jwt = await authorizeByJwt(
      pathJwtFile,
      `https://www.googleapis.com/auth/spreadsheets${scopeSuffix}`,
    );
    return google.sheets({version: 'v4', auth: jwt});
  }

  public static diff(
    originalValues: any[] | undefined,
    newValues: any[] | undefined,
  ) {
    if (!newValues) {
      const cellCount = originalValues?.length ?? 0;
      return [...Array(cellCount)].map(_ => '');
    }

    if (!originalValues) {
      return newValues;
    }

    const maxCellCount = Math.max(originalValues.length, newValues.length);
    const values: unknown[] = [...Array(maxCellCount)].map(_ => '');
    newValues.forEach((value, i) => {
      const original = originalValues[i] ?? '';

      const isSame = !Number.isNaN(original)
        ? isSameFloat(value, original)
        : value === original;
      return isSame ? null : value;
    });
    return values.every(value => value === null) ? [] : values;
  }

  /**
   * Find sheetId in a spreadsheet
   *
   * @param client Google Sheets API client.
   * @param spreadsheetId The spreadsheet to request.
   * @param title The name of the sheet to search.
   */
  public static async findSheetId(
    client: sheets_v4.Sheets,
    spreadsheetId: string,
    title: string,
  ) {
    const response = await client.spreadsheets.get({
      spreadsheetId: spreadsheetId,
      includeGridData: false,
      auth: client.context._options.auth,
    });

    const id = response.data.sheets
      ?.map(x => x.properties)
      ?.find(x => x?.title === title)?.sheetId;
    return !id ? undefined : id;
  }
}

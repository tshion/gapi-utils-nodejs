"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetsUtil = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const googleapis_1 = require("googleapis");
const core_util_1 = require("./core.util");
/**
 * Utilities for [Google Sheets API](https://developers.google.com/sheets)
 */
class SheetsUtil {
    /**
     * Create a client for the Google Sheets API
     *
     * @param pathJwtFile Path to the JSON Web Token file for google service account credentials.
     * @param canWrite Whether to allow writing or not.
     */
    static async createClient(pathJwtFile, canWrite = false) {
        const scopeSuffix = canWrite ? '' : '.readonly';
        const jwt = await (0, core_util_1.authorizeByJwt)(pathJwtFile, `https://www.googleapis.com/auth/spreadsheets${scopeSuffix}`);
        return googleapis_1.google.sheets({ version: 'v4', auth: jwt });
    }
    static diff(originalValues, newValues) {
        if (!newValues) {
            const cellCount = originalValues?.length ?? 0;
            return [...Array(cellCount)].map(_ => '');
        }
        if (!originalValues) {
            return newValues;
        }
        const maxCellCount = Math.max(originalValues.length, newValues.length);
        const values = [...Array(maxCellCount)].map(_ => '');
        newValues.forEach((value, i) => {
            const original = originalValues[i] ?? '';
            const isSame = !Number.isNaN(original)
                ? (0, core_util_1.isSameFloat)(value, original)
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
    static async findSheetId(client, spreadsheetId, title) {
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
exports.SheetsUtil = SheetsUtil;

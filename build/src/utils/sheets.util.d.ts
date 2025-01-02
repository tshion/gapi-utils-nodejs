import { sheets_v4 } from 'googleapis';
/**
 * Utilities for [Google Sheets API](https://developers.google.com/sheets)
 */
export declare class SheetsUtil {
    /**
     * Create a client for the Google Sheets API
     *
     * @param pathJwtFile Path to the JSON Web Token file for google service account credentials.
     * @param canWrite Whether to allow writing or not.
     */
    static createClient(pathJwtFile: string, canWrite?: boolean): Promise<sheets_v4.Sheets>;
    static diff(originalValues: any[] | undefined, newValues: any[] | undefined): any[];
    /**
     * Find sheetId in a spreadsheet
     *
     * @param client Google Sheets API client.
     * @param spreadsheetId The spreadsheet to request.
     * @param title The name of the sheet to search.
     */
    static findSheetId(client: sheets_v4.Sheets, spreadsheetId: string, title: string): Promise<number | undefined>;
}

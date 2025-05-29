import {strictEqual, throws} from 'node:assert';
import test from 'node:test';
import {SheetsUtil} from './sheets.util';

void test('SheetsUtil', async context => {
  await context.test('formatCellAddress', () => {
    const fxTest = (row: number, column: number, expected: string) => {
      const result = SheetsUtil.formatCellAddress(row, column);
      strictEqual(result, expected);
    };

    fxTest(1, 1, 'A1');
    fxTest(1, 26, 'Z1');
    fxTest(1, 27, 'AA1');
    fxTest(1, 52, 'AZ1');
    fxTest(1, 53, 'BA1');
    fxTest(1, 702, 'ZZ1');

    throws(() => SheetsUtil.formatCellAddress(0, 1), RangeError);
    throws(() => SheetsUtil.formatCellAddress(1, 0), RangeError);
  });
});

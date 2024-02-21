const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', () => {
  test('works with 1 item', () => {
    const result = sqlForPartialUpdate({ f1: 'v1' }, { f1: 'f1', fF2: 'f2' });
    expect(result).toEqual({ setCols: '"f1"=$1', values: ['v1'] });
  });

  test('works with 2 items', () => {
    const result = sqlForPartialUpdate({ f1: 'v1', jsF2: 'v2' }, { jsF2: 'f2' });
    expect(result).toEqual({ setCols: '"f1"=$1, "f2"=$2', values: ['v1', 'v2'] });
  });

  test('throws BadRequestError for empty data', () => {
    const dataToUpdate = {};
    const jsToSql = { firstName: 'first_name' };
    expect(() => sqlForPartialUpdate(dataToUpdate, jsToSql)).toThrowError(BadRequestError);
  });
});

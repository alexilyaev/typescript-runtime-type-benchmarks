import { type } from 'arktype';
import { describe, expect, test } from 'vitest';

const newTicker = {
  ticker: 'AAPL',
};

const minValue = (value: number) =>
  type('string.numeric.parse').narrow((parsedNumber, ctx) => {
    if (parsedNumber <= value) {
      return ctx.mustBe(`greater than ${String(value)}`);
    }

    return true;
  });

describe('Runtime Type Checking', () => {
  test('arktype', () => {
    const addStockFormSchema = type({
      ticker: '1 <= string <= 20',
    });
    const addTransactionFormSchema = type({
      stockId: minValue(0),
      shares: minValue(1),
      price: minValue(0),
      transactionDate: 'string.date',
    });

    const tickerResult = addStockFormSchema(newTicker);

    if (tickerResult instanceof type.errors) {
      expect.unreachable(tickerResult.summary);
    } else {
      expect(tickerResult.ticker).toBeTypeOf('string');
    }

    const addTransactionResult = addTransactionFormSchema({
      stockId: '1',
      shares: '100',
      price: '533.33',
      transactionDate: '2021-01-01',
    });

    if (addTransactionResult instanceof type.errors) {
      expect.unreachable(addTransactionResult.summary);
    } else {
      expect(addTransactionResult.stockId).toBeTypeOf('number');
    }
  });

  test('arktype bad values', () => {
    const addStockFormSchema = type({
      ticker: '1 <= string <= 20',
    });
    const addTransactionFormSchema = type({
      stockId: minValue(0),
      shares: minValue(1),
      price: minValue(0),
      transactionDate: 'string.date',
    });

    const tickerResult = addStockFormSchema(newTicker);

    if (tickerResult instanceof type.errors) {
      expect.unreachable(tickerResult.summary);
    } else {
      expect(tickerResult.ticker).toBeTypeOf('string');
    }

    const addTransactionResult = addTransactionFormSchema({
      stockId: '0',
      shares: '100',
      price: '533.33',
      transactionDate: '2021-01-01',
    });

    if (addTransactionResult instanceof type.errors) {
      expect(addTransactionResult.summary).toContain(
        'stockId must be greater than 0',
      );
    } else {
      expect.unreachable(
        `Value ${String(addTransactionResult.stockId)} should have errored`,
      );
    }
  });
});

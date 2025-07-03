import { type } from 'arktype';
import { newTicker, newTransaction } from './common';

// Using this makes the validation be 140x times slower
// https://arktype.io/intro/adding-constraints/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const minValue = (value: number) =>
  type('string.numeric.parse').narrow((parsedNumber, ctx) => {
    if (parsedNumber <= value) {
      return ctx.mustBe(`greater than ${String(value)}`);
    }

    return true;
  });

const addStockFormSchema = type({
  ticker: '1 <= string <= 20',
});
const addTransactionFormSchema = type({
  // stockId: minValue(0),
  stockId: 'string.numeric.parse',
  // shares: minValue(1),
  shares: 'string.numeric.parse',
  // price: minValue(0),
  price: 'string.numeric.parse',
  transactionDate: 'string.date',
});

const tickerResult = addStockFormSchema(newTicker);

if (tickerResult instanceof type.errors) {
  // eslint-disable-next-line no-console
  console.log(tickerResult.summary);
} else {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tickerResult;
}

const addTransactionResult = addTransactionFormSchema(newTransaction);

if (addTransactionResult instanceof type.errors) {
  // eslint-disable-next-line no-console
  console.log(addTransactionResult.summary);
} else {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  addTransactionResult;
}

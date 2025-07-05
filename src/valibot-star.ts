// eslint-disable-next-line import/no-namespace
import * as v from 'valibot';
import { newTicker, newTransaction } from './common';

const addStockFormSchema = v.object({
  ticker: v.pipe(
    v.string(),
    v.minLength(1, 'Too short'),
    v.maxLength(20, 'Too long'),
  ),
});
const addTransactionFormSchema = v.object({
  stockId: v.pipe(
    v.string(),
    v.transform(Number),
    v.notValue(0),
    v.minValue(0),
  ),
  shares: v.pipe(v.string(), v.transform(Number), v.minValue(1)),
  price: v.pipe(v.string(), v.transform(Number), v.notValue(0), v.minValue(0)),
  transactionDate: v.string(),
});

const tickerResult = v.safeParse(addStockFormSchema, newTicker);

if (tickerResult.success) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tickerResult.output;
} else {
  // eslint-disable-next-line no-console
  console.log(tickerResult.issues);
}

const addTransactionResult = v.safeParse(
  addTransactionFormSchema,
  newTransaction,
);

if (addTransactionResult.success) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  addTransactionResult.output;
} else {
  // eslint-disable-next-line no-console
  console.log(addTransactionResult.issues);
}

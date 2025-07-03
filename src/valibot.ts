import {
  maxLength,
  minLength,
  minValue,
  notValue,
  object,
  pipe,
  safeParse,
  string,
  transform,
} from 'valibot';
import { newTicker, newTransaction } from './common';

const addStockFormSchema = object({
  ticker: pipe(string(), minLength(1, 'Too short'), maxLength(20, 'Too long')),
});
const addTransactionFormSchema = object({
  stockId: pipe(string(), transform(Number), notValue(0), minValue(0)),
  shares: pipe(string(), transform(Number), minValue(1)),
  price: pipe(string(), transform(Number), notValue(0), minValue(0)),
  transactionDate: string(),
});

const tickerResult = safeParse(addStockFormSchema, newTicker);

if (tickerResult.success) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tickerResult.output;
} else {
  // eslint-disable-next-line no-console
  console.log(tickerResult.issues);
}

const addTransactionResult = safeParse(
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

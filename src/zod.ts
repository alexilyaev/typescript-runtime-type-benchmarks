import { z } from 'zod';
import { newTicker, newTransaction } from './common';

const addStockFormSchema = z.object({
  ticker: z.string().min(1, 'Too short123').max(20, 'Too long'),
});
const addTransactionFormSchema = z.object({
  stockId: z.coerce.number().positive(),
  shares: z.coerce.number().min(1),
  price: z.coerce.number().positive(),
  transactionDate: z.string(),
});

const tickerResult = addStockFormSchema.safeParse(newTicker);

if (tickerResult.success) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tickerResult.data;
} else {
  // eslint-disable-next-line no-console
  console.log(tickerResult.error);
}

const addTransactionResult = addTransactionFormSchema.safeParse(newTransaction);

if (addTransactionResult.success) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  addTransactionResult.data;
} else {
  // eslint-disable-next-line no-console
  console.log(addTransactionResult.error);
}

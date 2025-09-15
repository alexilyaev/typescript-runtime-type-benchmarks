import { z } from 'zod/v4-mini';
import { newTicker, newTransaction } from '../common';

const addStockFormSchema = z.object({
  ticker: z
    .string()
    .check(z.minLength(1, 'Too short'), z.maxLength(20, 'Too long')),
});
const addTransactionFormSchema = z.object({
  stockId: z.coerce.number().check(z.positive()),
  shares: z.coerce.number().check(z.minimum(1)),
  price: z.coerce.number().check(z.positive()),
  transactionDate: z.string(),
});

const tickerResult = addStockFormSchema.safeParse(newTicker);

if (tickerResult.success) {
  tickerResult.data;
} else {
  console.log(tickerResult.error);
}

const addTransactionResult = addTransactionFormSchema.safeParse(newTransaction);

if (addTransactionResult.success) {
  addTransactionResult.data;
} else {
  console.log(addTransactionResult.error);
}

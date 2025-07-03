import { z } from 'zod';
import { z as z4 } from 'zod/v4';
import { z as z4Mini } from 'zod/v4-mini';
import { type } from 'arktype';
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
import { bench, describe } from 'vitest';
import { newTicker, newTransaction } from 'src/common';

describe('Runtime Type Checking', () => {
  bench('zod', () => {
    const addStockFormSchema = z.object({
      ticker: z.string().min(1, 'Too short').max(20, 'Too long'),
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

    const addTransactionResult =
      addTransactionFormSchema.safeParse(newTransaction);

    if (addTransactionResult.success) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      addTransactionResult.data;
    } else {
      // eslint-disable-next-line no-console
      console.log(addTransactionResult.error);
    }
  });

  bench('zod v4', () => {
    const z = z4;
    const addStockFormSchema = z.object({
      ticker: z.string().min(1, 'Too short').max(20, 'Too long'),
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

    const addTransactionResult =
      addTransactionFormSchema.safeParse(newTransaction);

    if (addTransactionResult.success) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      addTransactionResult.data;
    } else {
      // eslint-disable-next-line no-console
      console.log(addTransactionResult.error);
    }
  });

  bench('zod v4 Mini', () => {
    const z = z4Mini;
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      tickerResult.data;
    } else {
      // eslint-disable-next-line no-console
      console.log(tickerResult.error);
    }

    const addTransactionResult =
      addTransactionFormSchema.safeParse(newTransaction);

    if (addTransactionResult.success) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      addTransactionResult.data;
    } else {
      // eslint-disable-next-line no-console
      console.log(addTransactionResult.error);
    }
  });

  bench('valibot', () => {
    const addStockFormSchema = object({
      ticker: pipe(
        string(),
        minLength(1, 'Too short'),
        maxLength(20, 'Too long'),
      ),
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
  });

  bench('arktype', () => {
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
  });
});

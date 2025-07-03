# TypeScript Runtime Type Libraries Benchmarks

- Comparing the runtime performance of various TypeScript runtime validation libraries.
- Also comparing their actual bundle size for typical usage.

## Results

```shell
pnpm i
```

To see the benchmark results:

```shell
pnpm run bench
```

To see the bundle size results:

```shell
pnpm run build
```

**Note:**

> For now, you'll need to manually comment out the imports in `src/main.ts` and run the command again to see the bundle size results for each library.

## Related Projects

- [typescript-runtime-type-benchmarks](https://github.com/moltar/typescript-runtime-type-benchmarks)

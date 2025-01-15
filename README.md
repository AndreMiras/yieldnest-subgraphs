# YieldNest Subgraphs

## Install

```sh
npm ci
```

## Build

We're using custom build commands to generate the `schema.graphql` and simplify
the graph build.

```sh
npm run build:schema
npm run build:graph
```

## Deploy

```sh
cd yneth && npx graph deploy yneth
```

## Development

Note that we try to keep most of the scaffolded files untouched. This make it
easier to regenerate them as needed e.g. on contract update. This is why we use
`yneth/src/index.ts` and `yneth/src/yn-eth-metrics.ts` to extend
`yneth/src/yn-eth.ts` and `yneth/metrics-schema.graphql` to extend
`yneth/schema.graphql`.

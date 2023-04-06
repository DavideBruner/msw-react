# msw-react

> A small library to easily integrate msw with react.

## Why

You can use this utility to test your React components without the need of a backend server.
It wraps [msw](https://github.com/mswjs/msw), so you can refer to the documentation [here](https://mswjs.io/docs/).

## Features

- Small and lightweight
- Built-in Typescript support

## Installation

```bash
npm install -s msw-react
or
yarn add msw-react
or
pnpm install msw-react
```

## Initialize

As said before this utility is essentially a react wrap for the `msw` library, this means that to make it work on the client a Service Worker needs to be created.

To do so, just run `npx msw init <public_dir> --save` where `<public_dir>` corresponds to the public directory of your project:

```bash
npx msw init ./public --save
or
pnpx msw init ./public --save
```

## Usage

Wrap your code in `MockProvider` component to make the worker instance available to all the sub components.

### MockProvider

#### handlers

```ts
const handlers = [
  rest.get("https://github.com/octocat", (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(202, "Mocked status"),
      ctx.json({
        message: "Mocked response JSON body",
      })
    );
  }),
];
```

```tsx
<MockProvider handlers={handlers}>
  <App />
</MockProvider>
```

#### startOnMount

By default it will start the worker server on mount, you can override this behavior using the `startOnMount` boolean prop.

```tsx
<MockProvider handlers={handlers} startOnMount={false}>
  <App />
</MockProvider>
```

#### startOptions

Or if you wanna pass some custom options to the start method you can pass them as `startOptions` prop. Take a look [here](https://mswjs.io/docs/api/setup-worker/start) for a list of all the available options

```tsx
<MockProvider handlers={} startOptions={{ quiet: true, waitUntilReady: true }}>
  <App />
</MockProvider>
```

#### enabled

By default the Service Worker gets setup only on the Development mode, but it allows you to control it using the `enabled` prop which as suggested by msw defaults to `process.env.NODE_ENV === "development"`

```tsx
<MockProvider handlers={handlers} enabled={false}>
  <App />
</MockProvider>
```

#### setupServer

We give you also access to override the default `setupServer` function (which defaults to the msw implementation)

```ts
const customSetupServer = (handlers) => {
  doSomethingElse();
  setupServer(...handlers);
};
```

```tsx
<MockProvider handlers={handlers} setupServer={customSetupServer}>
  <App />
</MockProvider>
```

### useWorker - MswWorker

Each child of the MockProvider will have access to the worker instance. Either by using the `useWorker` hook:

```tsx
import { useWorker } from "msw-react";
const Child = () => {
  const worker = useWorker();
  useEffect(() => {
    worker.stop();
  }, []);

  return <div>Hello</div>;
};
```

Or using the `MswWorker` component:

```tsx
import { MswWorker } from 'msw-react';
const Child2 = () => {
  return (
    <MswWorker>
      {(worker) => (
        <>Hello<>
      )}
    </MswWorker>
  );
}
```

## Examples

The advantage of being a simple wrap of msw is that it works out of the box with other libraries that implement msw's API, some examples:

- [ts-mckr](https://www.npmjs.com/package/ts-mckr):

```tsx
// Import
import dbUtils, { MockServer, MockServerInit } from "ts-mckr";

// Import static data
import quotes from "./quotes.json";

// Database creation
const mockDb = {
  quotes: {
    id: dbUtils.primaryKey(Number),
    quote: String,
    author: String,
  },
  users: {
    id: dbUtils.primaryKey(Number),
    name: String,
  },
};

const handlers = new MockServer()
  // Database init
  .createDB(mockDb)
  // Dataset injection, using fake data
  .createDataSet(
    {
      users: [
        {
          name: MockServer.getFakeData({
            module: "name",
            method: "fullName",
            language: "it",
          }),
          birthDate: MockServer.getFakeData({
            module: "date",
            method: "birthdate",
          }),
        },
      ],
    },
    // Dataset options
    { repeat: 40 }
  )
  // Dataset injection, using json data (static)
  .createDataSet({ quotes })
  // Get handlers (get, post, ecc...)
  .createHandlers();

// Create worker

return (
  <MockProvider handlers={handlers} setupServer={MockServerInit}>
    <App />
  </MockProvider>
);
```

# msw-react

> A small utility to easily integrate msw mock servers with react.

## Purpose

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

## Usage

### Initialize

As said [here](#purpose) this utility is essentially a msw wrap, so to work the Service Worker needs to be create.
To do so, just run:

```bash
npx msw init ./public --save
or
pnpx msw init ./public --save
```

### Create Handlers for the mock server

### Examples

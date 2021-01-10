# redux-actions-lite

[![Build Status](https://travis-ci.com/andrevinsky/redux-actions-lite.svg?branch=main)](https://travis-ci.com/andrevinsky/redux-actions-lite)
[![codecov](https://codecov.io/gh/andrevinsky/redux-actions-lite/branch/main/graph/badge.svg)](https://codecov.io/gh/andrevinsky/redux-actions-lite)

> [redux-actions](https://github.com/redux-utilities/redux-actions) simplified

Notorious action types are overrated. There is absolutely no need for a developer to type action constants for every action - this can be done under the hood. This library offers a higher-order action creator, `actionType(textDescription, ...actionCreatorArgs)`, which omits the first argument of `createAction(type, payloadCreator, metaCreator)`, i.e. `type`, replacing it with a much more useful `description` parameter. You are welcome to see it for yourself.


## Installation

```bash
npm i redux-actions-lite --save
```

## Usage

```js

import { actionType } from 'redux-actions-lite';

const dismissError = actionType('Dismissing alert directly or by timeout',
  (action) => ({ action }), ({ meta }) => meta);

const notificationMsg = actionType('Display notification',
  k => k,
  () => ({ previousAction: { meta: { timestamp: new Date() - 0 } } }));
```

## Documentation

- [Introduction](https://redux-actions.js.org/introduction)
- [API](https://redux-actions.js.org/api)
- [External Resources](https://redux-actions.js.org/externalresources)
- [Changelog](https://redux-actions.js.org/changelog)
- [Contributors](https://github.com/redux-utilities/redux-actions/graphs/contributors)

# @chiptoma/validation-lib

A collection of validation helpers and rules, based on Yup.

## Installation

```sh
npm install @chiptoma/validation-lib
```

```sh
yarn add @chiptoma/validation-lib
```

## Usage

```js
import { isEmail, isPhoneNumber } from '@chip/validation-lib';
```

## Helpers

The library provides various helpers for common validation tasks:

- `containsEmail`
- `containsPhoneNumber`
- `containsUrl`
- `hasDigits`
- `hasLowercase`
- `hasMaxWords`
- `hasUppercase`
- `isCompanyName`
- `isEmail`
- `isPersonName`
- `isPhoneNumber`
- `isUrl`
- `onlyAlphaNumericSpaceHypen`
- `onlyAlphaSpaceHyphen`
- `requiredWhen`
- `sameAs`

## Rules

Additionally, the library includes predefined rules for common fields:

- `business`
- `category`
- `description`
- `email`
- `location`
- `name`
- `password`
- `phone`
- `website`

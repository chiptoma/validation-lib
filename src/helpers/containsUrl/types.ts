import { TestContext, ValidateOptions } from 'yup'

import urlRegexSafe from 'url-regex-safe'

// The options object for the `url-regex-safe` package
export type UrlRegexSafeOptions = Parameters<typeof urlRegexSafe>[0]

// Extend the Yup TestContext interface to include the options object
export type IContainsUrlTestContext = TestContext<{
  containsUrlOpts?: Partial<ValidateOptions<UrlRegexSafeOptions>>
}>

// Extend the Yup StringSchema interface to include the `notContainsUrl` method
declare module 'yup' {
  interface StringSchema {
    notContainsUrl(message?: string, opts?: Partial<UrlRegexSafeOptions>): StringSchema
  }
}

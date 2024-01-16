import { TestContext } from 'yup'
import { IsURLOptions } from 'validator/lib/isURL'

// Extend the Yup TestContext interface to include the options object
export type IsUrlTestContext = TestContext<{
  isUrlOpts?: Partial<IsURLOptions>
}>

// Extend the Yup StringSchema interface to include the `isUrl` method
declare module 'yup' {
  interface StringSchema {
    isUrl(message?: string, opts?: Partial<IsURLOptions>): StringSchema
  }
}

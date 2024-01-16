import { IsEmailOptions } from 'validator/lib/isEmail'
import { TestContext } from 'yup'

// Extend the Yup TestContext interface to include the options object
export type IContainsEmailTestContext = TestContext<{
  containsEmailOpts?: Partial<IsEmailOptions>
}>

// Extend the Yup StringSchema interface to include the `notContainsEmail` method
declare module 'yup' {
  interface StringSchema {
    notContainsEmail(message?: string, opts?: Partial<IsEmailOptions>): StringSchema
  }
}

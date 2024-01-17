import { IsEmailOptions } from 'validator/lib/isEmail.js'
import { TestContext } from 'yup'

// Extend the Yup TestContext interface to include the options object
export type IIsEmailTestContext = TestContext<{
  isEmailOpts?: Partial<IsEmailOptions>
}>

// Extend the Yup StringSchema interface to include the `isEmail` method
declare module 'yup' {
  interface StringSchema {
    isEmail(message?: string, opts?: Partial<IsEmailOptions>): StringSchema
  }
}

import { CountryCode } from 'libphonenumber-js'
import { TestContext } from 'yup'

// The `findPhoneNumbersInText` options object for the `libphonenumber-js` package
export interface IFindPhoneNumberInTextOptions {
  defaultCountry?: CountryCode
  defaultCallingCode?: string
  extended?: boolean
}

// The `containsPhoneNumber` options object
export interface IContainsPhoneNumberOptions extends IFindPhoneNumberInTextOptions {
  metadataSet: 'min' | 'max' | 'mobile' | 'custom'
  customMetadataPath: string
}

// Extend the Yup TestContext interface to include the `containsPhoneNumberOpts` object
export type IContainsPhoneNumberTestContext = TestContext<{
  containsPhoneNumberOpts?: Partial<IContainsPhoneNumberOptions>
}>

// Extend the Yup StringSchema interface to include the `notContainsPhoneNumber` method
declare module 'yup' {
  interface StringSchema {
    notContainsPhoneNumber(message?: string, opts?: Partial<IContainsPhoneNumberOptions>): StringSchema
  }
}

import { CountryCode } from 'libphonenumber-js'
import { TestContext, Reference } from 'yup'

// The `isPhoneNumber` options object
export interface IsPhoneNumberOptions {
  defaultCountry: CountryCode
  defaultCallingCode: string
  metadataSet: 'min' | 'max' | 'mobile' | 'custom'
  customMetadataPath: string
}

// Extend the Yup TestContext interface to include the `containsPhoneNumberOpts` object
export type IsPhoneNumberTestContext = TestContext<{
  isPhoneNumberOpts?: Partial<IsPhoneNumberOptions>
}>

// Extend the Yup StringSchema interface to include the `notContainsPhoneNumber` method
declare module 'yup' {
  interface StringSchema {
    isPhoneNumber(
      message?: string,
      countryCodeRef?: Reference<string>,
      opts?: Partial<IsPhoneNumberOptions>,
    ): StringSchema
  }
}

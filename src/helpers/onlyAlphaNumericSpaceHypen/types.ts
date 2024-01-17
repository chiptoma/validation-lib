import 'yup'

// Extend the Yup StringSchema interface to include the `onlyAlphaNumericSpaceHyphen` method
declare module 'yup' {
  interface StringSchema {
    onlyAlphaNumericSpaceHyphen(message?: string): StringSchema
  }
}

import 'yup'

// Extend the Yup StringSchema interface to include the `onlyAlphaSpaceHyphen` method
declare module 'yup' {
  interface StringSchema {
    onlyAlphaSpaceHyphen(message?: string): StringSchema
  }
}

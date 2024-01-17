import 'yup'

// Extend the Yup StringSchema interface to include the `isCompanyName` method
declare module 'yup' {
  interface StringSchema {
    isCompanyName(message?: string): StringSchema
  }
}

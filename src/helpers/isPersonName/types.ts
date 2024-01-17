import 'yup'

// Extend the Yup StringSchema interface to include the `isPersonName` method
declare module 'yup' {
  interface StringSchema {
    isPersonName(message?: string): StringSchema
  }
}

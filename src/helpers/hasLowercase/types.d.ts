import 'yup'

// Extend the Yup StringSchema interface to include the `hasLowercase` method
declare module 'yup' {
  interface StringSchema {
    hasLowercase(min: number, max?: number, message?: string): StringSchema
  }
}

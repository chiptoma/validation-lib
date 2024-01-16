import 'yup'

// Extend the Yup StringSchema interface to include the `hasDigits` method
declare module 'yup' {
  interface StringSchema {
    hasDigits(min: number, max?: number, message?: string): StringSchema
  }
}

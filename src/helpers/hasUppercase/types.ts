import 'yup'

// Extend the Yup StringSchema interface to include the `hasUppercase` method
declare module 'yup' {
  interface StringSchema {
    hasUppercase(min: number, max?: number, message?: string): StringSchema
  }
}

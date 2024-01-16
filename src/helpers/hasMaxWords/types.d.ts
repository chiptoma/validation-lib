import 'yup'

// Extend the Yup StringSchema interface to include the `hasMaxWords` method
declare module 'yup' {
  interface StringSchema {
    hasMaxWords(maxWords?: number, message?: string): StringSchema
  }
}

import { Reference } from 'yup'

// Extends the Yup StringSchema interface to include the `sameAs` method
declare module 'yup' {
  interface StringSchema {
    requiredWhen(ref: Reference, refLabel?: string, message?: string): StringSchema
  }
}

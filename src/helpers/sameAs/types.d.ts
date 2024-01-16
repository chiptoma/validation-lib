import { Reference } from 'yup'

// Extends the Yup StringSchema interface to include the `sameAs` method
declare module 'yup' {
  interface StringSchema {
    sameAs(ref: Reference, refLabel?: string, message?: string): StringSchema
  }
}

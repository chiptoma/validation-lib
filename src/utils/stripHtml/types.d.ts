import { Opts } from 'string-strip-html'
import 'yup'

// Extend the Yup StringSchema to include the `stripHtml` method
declare module 'yup' {
  interface StringSchema {
    stripHtml(opts?: Partial<Opts>): StringSchema
  }
}

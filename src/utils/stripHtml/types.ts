import 'yup'

import { Opts } from 'string-strip-html'

// Extend the Yup StringSchema to include the `stripHtml` method
declare module 'yup' {
  interface StringSchema {
    stripHtml(opts?: Partial<Opts>): StringSchema
  }
}

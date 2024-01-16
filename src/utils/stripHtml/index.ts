import { Opts, stripHtml as stringStripHtml } from 'string-strip-html'
import { addMethod, string } from 'yup'

/**
 * Strip any HTML tags from a string.
 * @param value - The value to be stripped.
 * @param opts - The options object to be passed to `string-strip-html`. (Optional)
 * @returns The stripped string.
 * @throws - `TypeError` if `value` is not a string.
 */
export const stripHtml = (value: string, opts?: Partial<Opts>): string => {
  if (typeof value !== 'string') throw new TypeError(`Expected value as string, got ${typeof value}`)

  return stringStripHtml(value.trim(), opts).result
}

// Add the `stripHtml` method to the yup string schema
addMethod(string, 'stripHtml', function (opts?: Partial<Opts>) {
  return this.transform((value) => typeof value === 'string' && stripHtml(value, opts))
})

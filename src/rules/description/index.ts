import { IDescriptionOptions } from './types.js'
import { string } from 'yup'

// The default options for the `description` rule.
const defaultOptions: IDescriptionOptions = {
  min: 100,
  max: 2000,
}

/**
 * Validates the description.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum number of characters allowed. (Default: `100`)
 * @param [opts.max] - The maximum number of characters allowed. (Default: `2000`)
 * @returns A yup string schema with validation rules for the description.
 */
export const description = (opts?: Partial<IDescriptionOptions>) => {
  const { min, max } = { ...defaultOptions, ...opts }

  return string()
    .min(min)
    .max(max)
    .notContainsUrl()
    .notContainsEmail()
    .notContainsPhoneNumber()
    .stripHtml()
    .emptyToUndefined()
    .required()
}

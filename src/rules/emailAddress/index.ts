import { IEmailAddressOptions } from './types.js'
import { string } from 'yup'

// The default options for the `email` rule.
const defaultOptions: IEmailAddressOptions = {
  min: 6,
  max: 254,
}

/**
 * Validates the email address.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum length of the email address. (Default: `6`)
 * @param [opts.max] - The maximum length of the email address. (Default: `254`)
 * @returns A yup string schema with validation rules for the email.
 */
export const emailAddress = (opts?: Partial<IEmailAddressOptions>) => {
  const { min, max } = { ...defaultOptions, ...opts }

  return string().min(min).max(max).isEmail().emptyToUndefined().required()
}

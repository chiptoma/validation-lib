import { IPasswordOptions } from './types.js'
import { string } from 'yup'

// The default options for the `password` rule.
const defaultOptions: IPasswordOptions = {
  min: 8,
  max: 20,
  lowercase: {
    min: 1,
  },
  uppercase: {
    min: 1,
  },
  digits: {
    min: 1,
  },
}

/**
 * Validates the password.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum length of the password. (Default: `8`)
 * @param [opts.max] - The maximum length of the password. (Default: `20`)
 * @param [opts.lowercase.min] - The minimum number of lowercase letters in the password. (Default: `1`)
 * @param [opts.lowercase.max] - The maximum number of lowercase letters in the password. (Optional)
 * @param [opts.uppercase.min] - The minimum number of uppercase letters in the password. (Default: `1`)
 * @param [opts.uppercase.max] - The maximum number of uppercase letters in the password. (Optional)
 * @param [opts.digits.min] - The minimum number of digits in the password. (Default: `1`)
 * @param [opts.digits.max] - The maximum number of digits in the password. (Optional)
 * @returns - A Yup string schema with validation rules for the password.
 */
export const password = (opts?: Partial<IPasswordOptions>) => {
  const { min, max, lowercase, uppercase, digits } = { ...defaultOptions, ...opts }

  return string()
    .min(min)
    .max(max)
    .hasLowercase(lowercase.min, lowercase.max)
    .hasUppercase(uppercase.min, uppercase.max)
    .hasDigits(digits.min, digits.max)
    .emptyToUndefined()
    .required()
}

import { addMethod, string } from 'yup'
import validatorIsEmailModule, { IsEmailOptions } from 'validator/es/lib/isEmail.js'

import { IIsEmailTestContext } from './types.js'
import { validateIfPresent } from '@utils/index.js'

// Default options for the `validator.isEmail` method.
const defaultOptions: Partial<IsEmailOptions> = {
  domain_specific_validation: true, // Extra rules even if the email address is syntactically valid
  allow_utf8_local_part: false, // Disallow non-ASCII characters in the local part of the email address
}

// Required because of the Node.js module system.
const validatorIsEmail = validatorIsEmailModule.default

/**
 * Checks if a string is a valid email address.
 *
 * Uses the `validator` module `isEmail` method.
 * @param value - The value to be checked.
 * @param [opts] - The options to be passed to the `validator.isEmail` method. (Optional)
 * @returns - `True` if the string is a valid email address, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 */
export const isEmail = (value: string, opts?: Partial<IsEmailOptions>): boolean => {
  if (typeof value !== 'string') throw new TypeError(`Expected string, received ${typeof value}`)

  return validatorIsEmail(value.trim(), { ...defaultOptions, ...opts })
}

// Add the `isEmail` method to the yup string schema.
addMethod(string, 'isEmail', function (message?: string, opts?: Partial<IsEmailOptions>) {
  return this.test({
    name: 'isEmail',
    message: message ?? 'validation:default.isEmail',
    test: (value, testContext) => {
      const { options } = testContext as IIsEmailTestContext
      const isEmailOpts = {
        ...opts,
        ...options.context?.isEmailOpts,
      }

      return validateIfPresent(isEmail, value, isEmailOpts)
    },
  })
})

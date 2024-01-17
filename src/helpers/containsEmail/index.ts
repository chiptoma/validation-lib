import { addMethod, string } from 'yup'
import validatorIsEmail, { IsEmailOptions } from 'validator/es/lib/isEmail'

import { IContainsEmailTestContext } from './types'
// @ts-expect-error: No types available
import emailRegexSafe from 'email-regex-safe'
import { validateIfPresent } from '@utils'

// Default options for validator.isEmail
const defaultOptions: Partial<IsEmailOptions> = {
  domain_specific_validation: true,
  allow_utf8_local_part: false,
}

/**
 * Checks if a string contains email addresses.
 *
 * Uses the `email-regex-safe` package to find potential email addresses in the string, then uses the `validator` package to validate the potential email addresses.
 * @param value - The string to be checked.
 * @param [opts] - The options object to be passed to `validator.isEmail`. (Optional)
 * @returns - `True` if the string contains at least one valid email address, otherwise `False`.
 * @throws - 'TypeError' if `value` is not a string.
 */
export const containsEmail = (value: string, opts?: Partial<IsEmailOptions>): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value as string, received ${typeof value}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
  const potentialEmails = value.trim().match(emailRegexSafe())
  const options = { ...defaultOptions, ...opts }
  console.dir(validatorIsEmail)
  // Use the validator package to validate the potential email addresses
  return potentialEmails?.some((email) => validatorIsEmail(email, options)) ?? false
}

// Add the `notContainsEmail` method to the yup string schema
addMethod(string, 'notContainsEmail', function (message?: string, opts?: Partial<IsEmailOptions>) {
  return this.test({
    name: 'notContainsEmail',
    message: message ?? 'validation:default.notContainsEmail',
    test: (value, testContext) => {
      const { options } = testContext as IContainsEmailTestContext
      const containsEmailOpts = { ...opts, ...options.context?.containsEmailOpts }

      return !validateIfPresent(containsEmail, value, containsEmailOpts)
    },
  })
})

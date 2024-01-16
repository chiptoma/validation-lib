import { addMethod, string } from 'yup'
import validatorIsUrl, { IsURLOptions } from 'validator/es/lib/isURL'

import { IsUrlTestContext } from './types'
import { validateIfPresent } from '@utils'

// Default options for the `validator.isURL` method.
const defaultOptions: Partial<IsURLOptions> = {
  require_protocol: false,
  allow_fragments: false,
}

/**
 * Checks if a string is a valid URL.
 *
 * Uses the `validator` module `isURL` method.
 * @param value - The value to be checked.
 * @param [opts] - The options to be passed to the `validator.isURL` method. (Optional)
 * @returns - `True` if the string is a valid URL, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 */
export const isUrl = (value: string, opts?: Partial<IsURLOptions>): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, received ${typeof value}`)
  }

  return validatorIsUrl(value.trim(), { ...defaultOptions, ...opts })
}

// Add the `isUrl` method to the yup string schema.
addMethod(string, 'isUrl', function (message?: string, opts?: Partial<IsURLOptions>) {
  return this.test({
    name: 'isUrl',
    message: message ?? 'validation:default.isUrl',
    test: (value, testContext) => {
      const { options } = testContext as IsUrlTestContext
      const isUrlOpts = {
        ...opts,
        ...options.context?.isUrlOpts,
      }

      return validateIfPresent(isUrl, value, isUrlOpts)
    },
  })
})

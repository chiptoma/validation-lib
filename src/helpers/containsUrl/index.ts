import { IContainsUrlTestContext, UrlRegexSafeOptions } from './types.js'
import { addMethod, string } from 'yup'

import urlRegexSafe from 'url-regex-safe'
import { validateIfPresent } from '@utils/index.js'

/**
 * Check if a string contains any urls
 *
 * Uses the `url-regex-safe package` to find potential urls in the string.
 * @param value - The value to be checked
 * @param [opts] - The options object to be passed to `url-regex-safe`. (Optional)
 * @returns `True` if the string contains a url, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 */
export const containsUrl = (value: string, opts?: Partial<UrlRegexSafeOptions>): boolean => {
  if (typeof value !== 'string') throw new TypeError(`Expected value as string, got ${typeof value}`)

  const potentialUrls = value.trim().match(urlRegexSafe(opts))

  return potentialUrls !== null && potentialUrls.length > 0
}

// Add the `notContainsUrl` method to the yup string schema
addMethod(string, 'notContainsUrl', function (message?: string, opts?: Partial<UrlRegexSafeOptions>) {
  return this.test({
    name: 'notContainsUrl',
    message: message ?? 'default.notContainsUrl',
    test: (value, testContext) => {
      const { options } = testContext as IContainsUrlTestContext
      const containsUrlOpts = {
        ...opts,
        ...options.context?.containsUrlOpts,
      }

      return !validateIfPresent(containsUrl, value, containsUrlOpts)
    },
  })
})

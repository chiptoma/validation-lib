import { IContainsPhoneNumberOptions, IContainsPhoneNumberTestContext, IFindPhoneNumberInTextOptions } from './types.js'
import { addMethod, string } from 'yup'

import { MetadataJson } from 'libphonenumber-js'
import { validateIfPresent } from '@utils/index.js'

// Default options for the `containsPhoneNumber` helper.
const defaultOptions: Partial<IContainsPhoneNumberOptions> = {
  metadataSet: 'max',
}

/**
 * Checks if a string contains phone numbers.
 *
 * Uses `libphonenumber-js` module and its `findPhoneNumbersInText` method.
 * @param value - The value to be checked.
 * @param [opts] - The options object to be passed to the `findPhoneNumbersInText` method. (Optional)
 * @param [opts.metadataSet] - The metadata set to be used. (Default: `max`)
 * @param [opts.customMetadataPath] - The path to the custom metadata file. (Required if `metadataSet` is `custom`)
 * @returns - `True` if the string contains phone numbers, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 * @throws - `TypeError` if the custom metadata file provided is empty.
 * @throws - `Error` if `customMetadata` is not a string.
 */
export const containsPhoneNumber = async (
  value: string,
  opts?: Partial<IContainsPhoneNumberOptions>,
): Promise<boolean> => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value as string, received ${typeof value}`)
  }

  const { metadataSet, customMetadataPath, ...findPhoneNumbersInTextOpts } = { ...defaultOptions, ...opts }

  let findPhoneNumbersInText // The method to be used
  let metadata // The metadata to be used (if any)

  // Dynamically load the appropriate version of the library
  switch (metadataSet) {
    case 'min': {
      ;({ findPhoneNumbersInText } = await import('libphonenumber-js/min'))
      break
    }
    case 'max': {
      ;({ findPhoneNumbersInText } = await import('libphonenumber-js/max'))
      break
    }
    case 'mobile': {
      ;({ findPhoneNumbersInText } = await import('libphonenumber-js/mobile'))
      break
    }
    case 'custom': {
      ;({ findPhoneNumbersInText } = await import('libphonenumber-js/core'))

      // Check if the path to the custom metadata file is provided
      if (typeof customMetadataPath !== 'string') {
        throw new TypeError(`Expected customMetadataPath as string, received ${typeof customMetadataPath}`)
      }

      // Dynamically load the custom JSON metadata file
      try {
        metadata = (await import(customMetadataPath)) as MetadataJson
      } catch {
        throw new Error('Custom metadata file could not be loaded')
      }

      break
    }
    default: {
      ;({ findPhoneNumbersInText } = await import('libphonenumber-js'))
      break
    }
  }

  // Search for phone numbers in the string
  const phoneNumbers =
    metadataSet === 'custom' && metadata
      ? findPhoneNumbersInText(value, findPhoneNumbersInTextOpts, { ...metadata })
      : findPhoneNumbersInText(value, findPhoneNumbersInTextOpts as MetadataJson & IFindPhoneNumberInTextOptions)

  return phoneNumbers.length > 0
}

// Add the `notContainsPhoneNumber` method to the yup string schema
addMethod(string, 'notContainsPhoneNumber', function (message?: string, opts?: Partial<IContainsPhoneNumberOptions>) {
  return this.test({
    name: 'notContainsPhoneNumber',
    message: message ?? 'default.notContainsPhoneNumber',
    test: async (value, testContext) => {
      const { options } = testContext as IContainsPhoneNumberTestContext
      const containsPhoneNumberOpts = {
        ...opts,
        ...options.context?.containsPhoneNumberOpts,
      }

      return !(await validateIfPresent(containsPhoneNumber, value, containsPhoneNumberOpts))
    },
  })
})

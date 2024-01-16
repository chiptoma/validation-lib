import { IsPhoneNumberOptions, IsPhoneNumberTestContext } from './types'
import { Reference, addMethod, string } from 'yup'

import { MetadataJson } from 'libphonenumber-js'
import { validateIfPresent } from '@utils'

// The default options for the `isPhoneNumber` helper.
const defaultOptions: Partial<IsPhoneNumberOptions> = {
  metadataSet: 'max',
}

/**
 * Checks if a string contains phone numbers.
 *
 * Uses `libphonenumber-js` module and its `isValidPhoneNumber` function.
 * @param value - The value to be checked.
 * @param [opts] - The options object. (Optional)
 * @param [opts.metadataSet] - The metadata set to be used. (Default: `max`)
 * @param [opts.customMetadataPath] - The path to the custom metadata file. (Required if `metadataSet` is `custom`)
 * @returns - `True` if the string contains phone numbers, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 * @throws - `TypeError` if the `customMetadataPath` is not a string.
 * @throws - `Error` if failed to load the custom metadata file.
 */
export const isPhoneNumber = async (value: string, opts?: Partial<IsPhoneNumberOptions>): Promise<boolean> => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value as string, received ${typeof value}`)
  }

  const { metadataSet, customMetadataPath, ...isValidPhoneNumberOpts } = { ...defaultOptions, ...opts }

  let isValidPhoneNumber
  let metadata

  // Dynamically load the appropriate version of the library
  switch (metadataSet) {
    case 'min': {
      ;({ isValidPhoneNumber } = await import('libphonenumber-js/min'))
      break
    }
    case 'max': {
      ;({ isValidPhoneNumber } = await import('libphonenumber-js/max'))
      break
    }
    case 'mobile': {
      ;({ isValidPhoneNumber } = await import('libphonenumber-js/mobile'))
      break
    }
    case 'custom': {
      ;({ isValidPhoneNumber } = await import('libphonenumber-js/core'))

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
      ;({ isValidPhoneNumber } = await import('libphonenumber-js'))
      break
    }
  }

  return metadataSet === 'custom' && metadata
    ? isValidPhoneNumber(value, isValidPhoneNumberOpts, { ...metadata })
    : // @ts-expect-error - The type definitions for this library are incorrect
      isValidPhoneNumber(value, isValidPhoneNumberOpts)
}

// Add the `isPhoneNumber` method to the yup string schema
addMethod(
  string,
  'isPhoneNumber',
  function (message?: string, callingCodeRef?: Reference<string>, opts?: Partial<IsPhoneNumberOptions>) {
    return this.test({
      name: 'isPhoneNumber',
      message: message ?? 'validation:default.isPhoneNumber',
      test: async function (value, testContext) {
        const { options } = testContext as IsPhoneNumberTestContext
        const isPhoneNumberOpts = {
          ...opts,
          ...options.context?.isPhoneNumberOpts,
        }

        if (callingCodeRef) {
          isPhoneNumberOpts.defaultCallingCode = this.resolve(callingCodeRef).replace(/^(00|\+)/, '')
        }

        return await validateIfPresent(isPhoneNumber, value, isPhoneNumberOpts)
      },
    })
  },
)

import { IPhoneCallingCodeOptions } from './types.js'
import { string } from 'yup'

/**
 * Validates the phone calling code.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.phoneNumberRef] - The reference to the phone number field to be used in the validation. (Optional)
 * @param [opts.phoneNumberLabel] - The label of the phone number field to be used in the validation. (Optional)
 * @returns A yup string schema with validation rules for the country calling code.
 */
export const phoneCallingCode = (opts?: Partial<IPhoneCallingCodeOptions>) => {
  let schema = string().emptyToUndefined()

  const { phoneNumberRef, phoneNumberLabel } = opts ?? {}

  schema = phoneNumberRef ? schema.requiredWhen(phoneNumberRef, phoneNumberLabel) : schema.required()

  return schema
}

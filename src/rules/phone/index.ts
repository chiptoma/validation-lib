import { Reference, string } from 'yup'

interface IPhoneCallingCodeOptions {
  phoneNumberRef?: Reference<string>
  phoneNumberLabel?: string
}

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

interface IPhoneNumberOptions {
  min: number
  max: number
  callingCodeRef?: Reference<string>
}

// Default options for the `phoneNumber` rule.
const defaultOpts: IPhoneNumberOptions = {
  min: 6,
  max: 15,
}

/**
 * Validates the phone number.
 * @param [opts] - The validation options object.
 * @param [opts.min] - The minimum length of the phone number. (Default: `6`)
 * @param [opts.max] - The maximum length of the phone number. (Default: `15`).
 * @param [opts.callingCodeRef] - The reference to the phone calling code field to be used in the validation. (Optional)
 * @returns A yup string schema with validation rules for the phone.
 */
export const phoneNumber = (opts?: Partial<IPhoneNumberOptions>) => {
  const { min, max, callingCodeRef } = { ...defaultOpts, ...opts }

  return string().min(min).max(max).isPhoneNumber(undefined, callingCodeRef).emptyToUndefined().required()
}

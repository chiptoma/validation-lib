import { Reference } from 'yup'

export interface IPhoneCallingCodeOptions {
  phoneNumberRef?: Reference<string>
  phoneNumberLabel?: string
}

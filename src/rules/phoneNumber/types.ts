import { Reference } from 'yup'

export interface IPhoneNumberOptions {
  min: number
  max: number
  callingCodeRef?: Reference<string>
}

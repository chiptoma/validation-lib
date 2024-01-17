import { IPersonNameOptions } from './types.js'
import { string } from 'yup'

// The default options for the `name` rule.
const defaultOptions: IPersonNameOptions = {
  min: 3,
  max: 50,
  maxWords: 4,
}

/**
 * Validates the name of a person.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum length of the name. (Default: `3`)
 * @param [opts.max] - The maximum length of the name. (Default: `50`)
 * @param [opts.maxWords] - The maximum number of words allowed in the name. (Default: `4`)
 * @returns A yup string schema with validation rules for the name.
 */
export const personName = (opts?: IPersonNameOptions) => {
  const { min, max, maxWords } = { ...defaultOptions, ...opts }

  return string().min(min).max(max).isPersonName().hasMaxWords(maxWords).emptyToUndefined().required()
}

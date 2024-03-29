import { IBusinessNameOptions } from './types.js'
import { string } from 'yup'

// The default options for the company name rule.
const defaultOptions: IBusinessNameOptions = {
  min: 3,
  max: 50,
}

/**
 * Validates the business name.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum length of the company name. (Default: `3`)
 * @param [opts.max] - The maximum length of the company name. (Default: `50`)
 * @returns A yup string schema with validation rules for the company name.
 */
export const businessName = (opts?: Partial<IBusinessNameOptions>) => {
  const { min, max } = { ...defaultOptions, ...opts }

  return string().min(min).max(max).isCompanyName().emptyToUndefined().required()
}

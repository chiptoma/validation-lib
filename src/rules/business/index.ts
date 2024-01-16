import { string } from 'yup'

interface IBusinessOptions {
  min: number
  max: number
}

// The default options for the company name rule.
const defaultOptions: IBusinessOptions = {
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
export const business = (opts?: Partial<IBusinessOptions>) => {
  const { min, max } = { ...defaultOptions, ...opts }

  return string().min(min).max(max).isCompanyName().emptyToUndefined().required()
}

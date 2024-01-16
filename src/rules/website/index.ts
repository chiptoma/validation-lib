import { string } from 'yup'

interface IWebsiteOptions {
  min: number
  max: number
}

// The default options for the `website` rule.
const defaultOptions: IWebsiteOptions = {
  min: 6,
  max: 255,
}

/**
 * Validates the website.
 * @param [opts] - The validation options object. (Optional)
 * @param [opts.min] - The minimum length of the website. (Default: `6`)
 * @param [opts.max] - The maximum length of the website. (Default: `255`)
 * @returns A yup string schema with validation rules for the website.
 */
export const website = (opts?: IWebsiteOptions) => {
  const { min, max } = { ...defaultOptions, ...opts }

  return string().min(min).max(max).isUrl().emptyToUndefined().required()
}

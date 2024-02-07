import { Reference, addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

// Add the `sameAs` method to the yup string schema
addMethod(string, 'sameAs', function (ref: Reference & { label?: string }, refLabel?: string, message?: string) {
  return this.test({
    name: 'sameAs',
    message: message ?? 'default.sameAs',
    params: {
      reference: ref.path,
      referenceLabel: refLabel ?? ref.label ?? ref.path,
    },
    test: function (value) {
      return validateIfPresent((val) => val === this.resolve(ref), value)
    },
  })
})

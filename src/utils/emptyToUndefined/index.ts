import { addMethod, mixed, string } from 'yup'

/**
 * Transforms an 'empty' value to undefined.
 * @param value - The value to be transformed.
 * @returns - The `value` if not empty, otherwise 'undefined'.
 * @example
 * emptyToUndefined('') // undefined
 * emptyToUndefined('   ') // undefined
 * emptyToUndefined([]) // undefined
 * emptyToUndefined({}) // undefined
 * emptyToUndefined(null) // undefined
 * emptyToUndefined('Hello, world!') // 'Hello, world!'
 * emptyToUndefined([1, 2, 3]) // [1, 2, 3]
 * emptyToUndefined({ foo: 'bar' }) // { foo: 'bar' }
 * emptyToUndefined(123) // 123
 * emptyToUndefined(true) // true
 * emptyToUndefined(false) // false
 * emptyToUndefined(undefined) // undefined
 * emptyToUndefined(NaN) // NaN
 * emptyToUndefined(Infinity) // Infinity
 * emptyToUndefined(-Infinity) // -Infinity
 */
export const emptyToUndefined = (value: unknown): unknown => {
  return isEmpty(value) ? undefined : value
}

// Custom isEmpty function
const isEmpty = (value: unknown): boolean => {
  return (
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && value !== null && Object.keys(value).length === 0) ||
    value === null
  )
}

// Add the `emptyToUndefined` method to the yup string schema
addMethod(string, 'emptyToUndefined', function () {
  return this.transform(emptyToUndefined)
})

// Add the `emptyToUndefined` method to the yup mixed schema
addMethod(mixed, 'emptyToUndefined', function () {
  return this.transform(emptyToUndefined)
})

export interface IPasswordOptions {
  min: number
  max: number
  lowercase: {
    min: number
    max?: number
  }
  uppercase: {
    min: number
    max?: number
  }
  digits: {
    min: number
    max?: number
  }
}

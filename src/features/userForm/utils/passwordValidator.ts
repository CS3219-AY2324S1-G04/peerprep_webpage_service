const minPasswordLength: number = 8
const maxPasswordLength: number = 255

const lowerCaseAlphabets: string = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseAlphabets: string = lowerCaseAlphabets.toUpperCase()
const numerics: string = '0123456789'
const specialCharacters: string = '!@#$%^&*'
const validCharacters: string =
  lowerCaseAlphabets + upperCaseAlphabets + numerics + specialCharacters

export default function validatePassword(password: string): string | undefined {
  if (password.length < minPasswordLength) {
    return `Password must be at least ${minPasswordLength} characters long.`
  }

  if (password.length > maxPasswordLength) {
    return `Password cannot exceed ${maxPasswordLength} characters.`
  }

  if (!new RegExp(`^[${validCharacters}]+$`).test(password)) {
    return `Password can only contain ${specialCharacters} or alphanumeric characters.`
  }

  if (
    !RegExp(`[${lowerCaseAlphabets}]`).test(password) ||
    !RegExp(`[${upperCaseAlphabets}]`).test(password) ||
    !RegExp(`[${numerics}]`).test(password) ||
    !RegExp(`[${specialCharacters}]`).test(password)
  ) {
    return `Password must contain at least one uppercase alphabet, one lowercase alphabet, one numeric character, and one of the following: ${specialCharacters}`
  }
}

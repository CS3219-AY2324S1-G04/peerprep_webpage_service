const maxEmailLength: number = 255

const domainEdgeChars: string = '[a-zA-Z0-9]'
const domainChars: string = '[a-zA-Z0-9\\-]'
const domainLabelRegex: string = `${domainEdgeChars}(${domainChars}*${domainEdgeChars}+)*`
const domainRegex: string = `${domainLabelRegex}(\\.${domainLabelRegex})+`

const emailLocalPartChars: string = "[a-zA-Z0-9!#$%&'*+\\-/=?^_`{|}~]"
const emailRegex: RegExp = new RegExp(
  `^${emailLocalPartChars}+(\\.${emailLocalPartChars}+)*@${domainRegex}$`,
)

export default function validateEmail(email: string): string | undefined {
  if (email.length === 0) {
    return 'Email cannot be empty.'
  }

  if (email.length > maxEmailLength) {
    return `Email cannot exceed ${maxEmailLength} characters.`
  }

  if (!emailRegex.test(email)) {
    return 'Email is invalid.'
  }
}

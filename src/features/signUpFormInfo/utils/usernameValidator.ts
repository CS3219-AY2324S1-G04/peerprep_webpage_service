const minUsernameLength: number = 3
const maxUsernameLength: number = 255
const usernameRegex: RegExp = new RegExp('^[a-zA-Z0-9_]+$')

export default function validateUsername(username: string): string | undefined {
  if (username.length < minUsernameLength) {
    return `Username must be at least ${minUsernameLength} characters long.`
  }

  if (username.length > maxUsernameLength) {
    return `Username cannot exceed ${maxUsernameLength} characters.`
  }

  if (!usernameRegex.test(username)) {
    return "Username can only contain '_' or alphanumeric characters."
  }
}

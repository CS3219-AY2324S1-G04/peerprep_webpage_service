export interface PageNavigation {
  url?: Paths | SubPaths
  title: string
  disabled?: boolean
  subPages?: PageNavigation[]
}

export enum Paths {
  Root = '/',
  Problems = '/problems',
  Rankings = '/rankings',
  Login = '/login',
  SignUp = '/signup',
  Manage = '/manage',
  Room = '/room/:roomId?',
  ManageQuestions = '/manage-questions',
  ManageUsers = '/manage-users',
  MatchRoom = '/room',
  Attempts = '/attempts',
  Questions = '/questions',
}

export enum SubPaths {
  ManageQuestions = `${Paths.Manage}/questions`,
  CreateQuestion = `${SubPaths.ManageQuestions}/create`,
  EditQuestion = `${SubPaths.ManageQuestions}/edit/:id`,
}

const QuestionsPage: PageNavigation = {
  url: Paths.Questions,
  title: 'Questions',
}

export const guestNavigationList: PageNavigation[] = []

export const userNavigationList: PageNavigation[] = [QuestionsPage]

export const adminNavigationList: PageNavigation[] = [QuestionsPage]

export default Paths

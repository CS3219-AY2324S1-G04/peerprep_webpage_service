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
  CreateQuestion = `${Paths.Questions}/create`,
  EditQuestion = `${Paths.Questions}/edit/:id`,
}

const ProblemsPage: PageNavigation = {
  url: Paths.Problems,
  title: 'Problems',
}
const QuestionsPage: PageNavigation = {
  url: Paths.Questions,
  title: 'Questions',
}
const RankingsPage: PageNavigation = {
  url: Paths.Rankings,
  title: 'Rankings',
}

const ManagePages: PageNavigation = {
  title: 'Manage',
  subPages: [
    {
      url: SubPaths.ManageQuestions,
      title: 'Questions',
    },
    {
      url: Paths.ManageUsers,
      title: 'Users',
      disabled: true,
    },
  ],
}

export const guestNavigationList: PageNavigation[] = [QuestionsPage]

export const userNavigationList: PageNavigation[] = [QuestionsPage]

export const adminNavigationList: PageNavigation[] = [
  ProblemsPage,
  RankingsPage,
  ManagePages,
]

export default Paths

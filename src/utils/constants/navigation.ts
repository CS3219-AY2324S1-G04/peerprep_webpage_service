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
}

export enum SubPaths {
  ManageQuestions = `${Paths.Manage}/questions`,
  CreateQuestion = `${SubPaths.ManageQuestions}/create`,
  EditQuestion = `${SubPaths.ManageQuestions}/edit/:id`,
}

const ProblemsPage: PageNavigation = {
  url: Paths.Problems,
  title: 'Problems',
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

export const guestNavigationList: PageNavigation[] = [
  ProblemsPage,
  RankingsPage,
]

export const userNavigationList: PageNavigation[] = [ProblemsPage, RankingsPage]

export const adminNavigationList: PageNavigation[] = [
  ProblemsPage,
  RankingsPage,
  ManagePages,
]

export default Paths

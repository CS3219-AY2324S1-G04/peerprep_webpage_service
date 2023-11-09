export interface PageNavigation {
  url?: Paths | SubPaths
  title: string
  disabled?: boolean
  subPages?: PageNavigation[]
}

export enum Paths {
  Root = '/',
  Dashboard = '/dashboard',
  Problems = '/problems',
  Rankings = '/rankings',
  Login = '/login',
  SignUp = '/signup',
  Manage = '/manage',
  Room = '/room/:roomId?',
  ManageQuestions = '/manage-questions',
  ManageUsers = '/manage-users',
  MatchRoom = '/room',
}

export enum SubPaths {
  ManageQuestions = `${Paths.Manage}/questions`,
  CreateQuestion = `${SubPaths.ManageQuestions}/create`,
  EditQuestion = `${SubPaths.ManageQuestions}/edit/:id`,
}

const DashboardPage: PageNavigation = {
  url: Paths.Dashboard,
  title: 'Dashboard',
}
const ProblemsPage: PageNavigation = {
  url: Paths.Problems,
  title: 'Problems',
}
const RankingsPage: PageNavigation = {
  url: Paths.Rankings,
  title: 'Rankings',
}
const RoomPage: PageNavigation = {
  url: Paths.MatchRoom,
  title: 'Room',
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

export const userNavigationList: PageNavigation[] = [
  DashboardPage,
  ProblemsPage,
  RankingsPage,
  RoomPage,
]

export const adminNavigationList: PageNavigation[] = [
  DashboardPage,
  ManagePages,
  ProblemsPage,
  RankingsPage,
]

export default Paths

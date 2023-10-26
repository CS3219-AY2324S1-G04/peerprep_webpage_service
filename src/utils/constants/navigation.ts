export interface PageNavigation {
  url?: Paths
  title: string
  subPages?: PageNavigation[]
}

enum Paths {
  Root = '/',
  Dashboard = '/dashboard',
  Problems = '/problems',
  Rankings = '/rankings',
  Login = '/login',
  SignUp = '/signup',
  ManageQuestions = '/manage-questions',
  ManageUsers = '/manage-users',
  MatchRoom = '/room',
  Room = '/room/:roomId',
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
const MatchRoomPage: PageNavigation = {
  url: Paths.MatchRoom,
  title: 'Room',
}

const ManagePages: PageNavigation = {
  title: 'Manage',
  subPages: [
    {
      url: Paths.ManageQuestions,
      title: 'Questions'
    },
    {
      url: Paths.ManageUsers,
      title: 'Users'
    },
  ]
}

export const guestNavigationList: PageNavigation[] = [
  ProblemsPage,
  RankingsPage,
]

export const userNavigationList: PageNavigation[] = [
  DashboardPage,
  ProblemsPage,
  RankingsPage,
  MatchRoomPage,
]

export const adminNavigationList: PageNavigation[] = [
  DashboardPage,
  ManagePages,
  ProblemsPage,
  RankingsPage,
]

export default Paths

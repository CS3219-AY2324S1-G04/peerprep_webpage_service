export interface PageNavigation {
  url: Paths
  title: string
}

enum Paths {
  Root = '/',
  Dashboard = '/dashboard',
  Problems = '/problems',
  Rankings = '/rankings',
  Login = '/login',
  SignUp = '/signup',
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

export const guestNavigationList: PageNavigation[] = [
  ProblemsPage,
  RankingsPage,
]

export const userNavigationList: PageNavigation[] = [
  DashboardPage,
  ProblemsPage,
  RankingsPage,
]

export default Paths

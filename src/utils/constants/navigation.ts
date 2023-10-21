export interface PageNavigation {
  url: Paths
  title: string
}

enum Paths {
  Root = '/',
  Dashboard = '/dashboard',
  Problems = '/problems',
  Rankings = '/rankings',
  Profile = '/profile',
  Login = '/login',
  SignUp = '/signup',
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

export default Paths

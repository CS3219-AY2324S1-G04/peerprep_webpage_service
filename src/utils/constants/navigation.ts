interface Page {
  url: string
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

const ProblemsPage: Page = {
  url: Paths.Problems,
  title: 'Problems',
}
const RankingsPage: Page = {
  url: Paths.Rankings,
  title: 'Rankings',
}

export const guestNavigationList: Page[] = [ProblemsPage, RankingsPage]

export default Paths

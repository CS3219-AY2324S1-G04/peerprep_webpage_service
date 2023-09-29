interface Page {
  url: string
  title: string
}

const Paths = {
  Dashboard: '/dashboard',
  Problems: '/problems',
  Rankings: '/rankings',
  Profile: '/profile',
  Login: '/login',
  SignUp: '/signup',
}

const ProblemsPage = {
  url: Paths.Problems,
  title: 'Problems',
}
const RankingsPage = {
  url: Paths.Rankings,
  title: 'Rankings',
}

export const guestNavigationList: Page[] = [ProblemsPage, RankingsPage]

export default Paths

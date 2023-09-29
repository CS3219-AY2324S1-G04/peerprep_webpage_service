import { useMatch } from 'react-router-dom'

import Paths from '../utils/constants/navigation'

export interface RouteMatches {
  isDashboardPage: boolean
  isProblemsPage: boolean
  isRankingsPage: boolean
  isProfilePage: boolean
  isLoginPage: boolean
  isSignUpPage: boolean
}

export default (): RouteMatches => {
  const isDashboardPage = useMatch(Paths.Dashboard)
  const isProblemsPage = useMatch(Paths.Problems)
  const isRankingsPage = useMatch(Paths.Rankings)
  const isProfilePage = useMatch(Paths.Profile)
  const isLoginPage = useMatch(Paths.Login)
  const isSignUpPage = useMatch(Paths.SignUp)

  return {
    isDashboardPage: Boolean(isDashboardPage),
    isProblemsPage: Boolean(isProblemsPage),
    isRankingsPage: Boolean(isRankingsPage),
    isProfilePage: Boolean(isProfilePage),
    isLoginPage: Boolean(isLoginPage),
    isSignUpPage: Boolean(isSignUpPage),
  }
}

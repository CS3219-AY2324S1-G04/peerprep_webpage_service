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

export function useRouteMatch() {
  const isDashboardPage = useMatch(Paths.Dashboard)
  const isProblemsPage = useMatch(Paths.Problems)
  const isRankingsPage = useMatch(Paths.Rankings)
  const isProfilePage = useMatch(Paths.Profile)
  const isLoginPage = useMatch(Paths.Login)
  const isSignUpPage = useMatch(Paths.SignUp)

  const getRouteMatch = (path: Paths) => {
    switch (path) {
      case Paths.Dashboard:
        return isDashboardPage
      case Paths.Problems:
        return isProblemsPage
      case Paths.Rankings:
        return isRankingsPage
      case Paths.Profile:
        return isProfilePage
      case Paths.SignUp:
        return isSignUpPage
      default:
        return isLoginPage
    }
  }

  return { getRouteMatch }
}

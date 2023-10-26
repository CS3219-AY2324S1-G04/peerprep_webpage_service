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
  const isLoginPage = useMatch(Paths.Login)
  const isSignUpPage = useMatch(Paths.SignUp)
  const isManageQuestionsPage = useMatch(Paths.ManageQuestions)
  const isManageUsersPage = useMatch(Paths.ManageUsers)

  const getRouteMatch = (path: Paths) => {
    switch (path) {
      case Paths.Dashboard:
        return isDashboardPage
      case Paths.Problems:
        return isProblemsPage
      case Paths.Rankings:
        return isRankingsPage
      case Paths.SignUp:
        return isSignUpPage
      case Paths.ManageQuestions:
        return isManageQuestionsPage
      case Paths.ManageUsers:
        return isManageUsersPage
      default:
        return isLoginPage
    }
  }

  return { getRouteMatch }
}

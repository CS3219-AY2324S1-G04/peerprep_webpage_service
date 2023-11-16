import { useMatch } from 'react-router-dom'

import { Paths, SubPaths } from '../utils/constants/navigation'

export interface RouteMatches {
  isDashboardPage: boolean
  isProblemsPage: boolean
  isRankingsPage: boolean
  isProfilePage: boolean
  isLoginPage: boolean
  isSignUpPage: boolean
}

export function useRouteMatch() {
  const isProblemsPage = useMatch(Paths.Problems)
  const isRankingsPage = useMatch(Paths.Rankings)
  const isLoginPage = useMatch(Paths.Login)
  const isSignUpPage = useMatch(Paths.SignUp)
  const isManageQuestionsPage = useMatch(SubPaths.ManageQuestions)
  const isManageUsersPage = useMatch(Paths.ManageUsers)
  const isAttemptsPage = useMatch(Paths.Attempts)
  const isQuestionsPage = useMatch(Paths.Questions)

  const getRouteMatch = (path: Paths | SubPaths) => {
    switch (path) {
      case Paths.Problems:
        return isProblemsPage
      case Paths.Rankings:
        return isRankingsPage
      case Paths.SignUp:
        return isSignUpPage
      case SubPaths.ManageQuestions:
        return isManageQuestionsPage
      case Paths.ManageUsers:
        return isManageUsersPage
      case Paths.Attempts:
        return isAttemptsPage
      case Paths.Questions:
        return isQuestionsPage
      default:
        return isLoginPage
    }
  }

  return { getRouteMatch }
}

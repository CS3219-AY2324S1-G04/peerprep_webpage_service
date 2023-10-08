import Paths from "../constants/navigation"
import { useMatch } from 'react-router-dom'

export interface RouteMatches {
  isDashboardPage: boolean
  isProblemsPage: boolean
  isRankingsPage: boolean
  isProfilePage: boolean
  isLoginPage: boolean
  isSignUpPage: boolean
}

export const getAllRouteMatches = (): RouteMatches => {
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

export const getRouteMatch = (path: Paths) => {
  const { isDashboardPage, isProblemsPage, isRankingsPage, isProfilePage, isLoginPage, isSignUpPage } = getAllRouteMatches()
  switch(path) {
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
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import { Layout } from './components/Layout'
import AdminNavigationBar from './components/Navigation/AdminNavigationBar'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import RoomNavigationBar from './components/Navigation/RoomNavigationBar'
import UserNavigationBar from './components/Navigation/UserNavigationBar'
import { Toaster } from './components/Toaster/Toaster'
import FindingRoomModal from './features/matching/components/FindingRoomModal'
import { applyAxiosInterceptorForUpdatingAccessToken } from './features/user/accessTokenAxiosInterceptor'
import { getIsLoggedIn, getUserRole } from './features/user/selector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import Attempts from './pages/Attempts'
import GuestRedirect from './pages/GuestRedirect'
import Login from './pages/Login'
import Problems from './pages/Problems'
import Rankings from './pages/Rankings'
import Room from './pages/Room'
import SignUp from './pages/SignUp'
import UserRedirect from './pages/UserRedirect'
import CreateQuestion from './pages/manage/CreateQuestion'
import EditQuestion from './pages/manage/EditQuestion'
import Questions from './pages/manage/Questions'
import { UserRole } from './services/userService'
import Paths, { SubPaths } from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'
import { CommonSagaActions } from './utils/types'

applyAxiosInterceptorForUpdatingAccessToken()

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const userRole = useAppSelector(getUserRole)
  const isRoomPage = useMatch(Paths.MatchRoom)

  useEffect(() => {
    dispatch({ type: CommonSagaActions.APP_INIT })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isAdminOrMaintainer =
    userRole === UserRole.admin || userRole === UserRole.maintainer
  const isNormalUser = userRole === UserRole.user

  return (
    <div className="App" style={{ height: '100%' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout.Root>
          <Layout.Header>
            {!isRoomPage && isLoggedIn && isAdminOrMaintainer && (
              <AdminNavigationBar />
            )}
            {!isRoomPage && isLoggedIn && isNormalUser && <UserNavigationBar />}
            {!isRoomPage && !isLoggedIn && <GuestNavigationBar />}
            {isRoomPage && <RoomNavigationBar />}
          </Layout.Header>
          <Layout.Main>
            <Toaster />
            <Routes>
              <Route path={Paths.Problems} element={<Problems />} />
              <Route path={Paths.Rankings} element={<Rankings />} />
              {isLoggedIn && isAdminOrMaintainer && (
                <>
                  <Route path={Paths.Room} element={<Room />} />
                  <Route path={Paths.Attempts} element={<Attempts />} />
                  <Route
                    path={SubPaths.ManageQuestions}
                    element={<Questions />}
                  />
                  <Route
                    path={SubPaths.CreateQuestion}
                    element={<CreateQuestion />}
                  />
                  <Route
                    path={SubPaths.EditQuestion}
                    element={<EditQuestion />}
                  />
                  <Route path="*" element={<UserRedirect />} />
                </>
              )}
              {isLoggedIn && isNormalUser && (
                <>
                  <Route path={Paths.Attempts} element={<Attempts />} />
                  <Route path={Paths.Room} element={<Room />} />
                  <Route path="*" element={<UserRedirect />} />
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Route path={Paths.Login} element={<Login />} />
                  <Route path={Paths.SignUp} element={<SignUp />} />
                  <Route path="*" element={<GuestRedirect />} />
                </>
              )}
            </Routes>
            <FindingRoomModal />
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

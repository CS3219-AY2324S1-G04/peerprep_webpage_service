import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import UserNavigationBar from './components/Navigation/UserNavigationBar'
import { Toaster } from './components/Toaster/Toaster'
import FindingRoomModal from './features/matching/components/FindingRoomModal'
import { applyAxiosInterceptorForUpdatingAccessToken } from './features/user/accessTokenAxiosInterceptor'
import { getIsLoggedIn } from './features/user/selector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import GuestRedirect from './pages/GuestRedirect'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserRedirect from './pages/UserRedirect'
import CreateQuestion from './pages/manage/CreateQuestion'
import EditQuestion from './pages/manage/EditQuestion'
import Questions from './pages/manage/Questions'
import Paths, { SubPaths } from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'
import { CommonSagaActions } from './utils/types'

applyAxiosInterceptorForUpdatingAccessToken()

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  useEffect(() => {
    dispatch({ type: CommonSagaActions.APP_INIT })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App" style={{ height: '100%' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout.Root>
          <Layout.Header>
            {isLoggedIn && <UserNavigationBar />}
            {!isLoggedIn && <GuestNavigationBar />}
          </Layout.Header>
          <Layout.Main>
            <Toaster />
            <Routes>
              <Route path="*" element={<UserRedirect />} />
              <Route path={Paths.Questions} element={<Questions />} />
              <Route
                path={SubPaths.CreateQuestion}
                element={<CreateQuestion />}
              />
              <Route path={SubPaths.EditQuestion} element={<EditQuestion />} />
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

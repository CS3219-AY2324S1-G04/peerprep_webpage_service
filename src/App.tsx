import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import UserNavigationBar from './components/Navigation/UserNavigationBar'
import { Toaster } from './components/Toaster/Toaster'
import { getIsLoggedIn } from './features/user/selector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import Dashboard from './pages/Dashboard'
import GuestRedirect from './pages/GuestRedirect'
import Login from './pages/Login'
import Problems from './pages/Problems'
import Rankings from './pages/Rankings'
import SignUp from './pages/SignUp'
import UserRedirect from './pages/UserRedirect'
import Paths from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'
import { CommonSagaActions } from './utils/types'

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
            {isLoggedIn ? <UserNavigationBar /> : <GuestNavigationBar />}
          </Layout.Header>
          <Layout.Main>
            <Toaster />
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path={Paths.Problems} element={<Problems />} />
                  <Route path={Paths.Rankings} element={<Rankings />} />
                  <Route path={Paths.Dashboard} element={<Dashboard />} />
                  <Route path="*" element={<UserRedirect />} />
                </>
              ) : (
                <>
                  <Route path={Paths.Problems} element={<Problems />} />
                  <Route path={Paths.Rankings} element={<Rankings />} />
                  <Route path={Paths.Login} element={<Login />} />
                  <Route path={Paths.SignUp} element={<SignUp />} />
                  <Route path="*" element={<GuestRedirect />} />
                </>
              )}
            </Routes>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

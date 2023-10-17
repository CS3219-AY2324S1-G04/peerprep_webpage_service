import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import { getIsLoggedIn } from './features/user/selector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Problems from './pages/Problems'
import Root from './pages/Root'
import SignUp from './pages/SignUp'
import Paths from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'
import { CommonSagaActions } from './utils/types'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(getIsLoggedIn)

  useEffect(() => {
    dispatch({ type: CommonSagaActions.APP_INIT })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isLoggedIn) {
      dispatch({ type: CommonSagaActions.APP_LOGGED_IN_INIT })
    }
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App" style={{ height: '100%' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout.Root>
          <Layout.Header>
            <GuestNavigationBar />
          </Layout.Header>
          <Layout.Main>
            {/* // TODO: Change routes depending on login status */}
            <Routes>
              <Route path={Paths.Root} element={<Root />} />
              <Route path={Paths.Dashboard} element={<Dashboard />} />
              <Route path={Paths.Problems} element={<Problems />} />
              <Route path={Paths.Login} element={<Login />} />
              <Route path={Paths.SignUp} element={<SignUp />} />
              {/* TODO: Create a route with path "*" for an Error 404 page */}
            </Routes>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

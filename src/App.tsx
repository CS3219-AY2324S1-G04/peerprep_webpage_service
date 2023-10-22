import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import { Toaster } from './components/Toaster/Toaster'
import { useAppDispatch } from './hooks/useAppDispatch'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import MatchRoom from './pages/MatchRoom'
import Problems from './pages/Problems'
import Room from './pages/Room'
import Root from './pages/Root'
import SignUp from './pages/SignUp'
import Paths from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'
import { CommonSagaActions } from './utils/types'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: CommonSagaActions.APP_INIT })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App" style={{ height: '100%' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout.Root>
          <Layout.Header>
            <GuestNavigationBar />
          </Layout.Header>
          <Layout.Main>
            <Toaster />
            {/* // TODO: Change routes depending on login status */}
            <Routes>
              <Route path={Paths.Root} element={<Root />} />
              <Route path={Paths.Dashboard} element={<Dashboard />} />
              <Route path={Paths.Problems} element={<Problems />} />
              <Route path={Paths.Login} element={<Login />} />
              <Route path={Paths.SignUp} element={<SignUp />} />
              <Route path={Paths.MatchRoom} element={<MatchRoom />} />
              <Route path={Paths.Room} element={<Room />} />
              {/* TODO: Create a route with path "*" for an Error 404 page */}
            </Routes>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

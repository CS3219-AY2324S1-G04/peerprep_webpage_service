import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import { selectIsLoggedIn } from './features/userInfo/selector'
import { updateUserInfo } from './features/userInfo/slice'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Problems from './pages/Problems'
import Root from './pages/Root'
import SignUp from './pages/SignUp'
import { getUserProfile } from './services/userService'
import Paths from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'

const App: React.FC = () => {
  // TODO: Rework this using Redux Saga
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile().then((profile) => dispatch(updateUserInfo(profile)))
    }
  })

  return (
    <div className="App">
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout.Root>
          <Layout.Header>
            <GuestNavigationBar />
          </Layout.Header>
          <Layout.Main>
            <Routes>
              <Route path="/" element={<Root />} />
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

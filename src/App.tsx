import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Problems from './pages/Problems'
import Root from './pages/Root'
import SignUp from './pages/SignUp'
import Paths from './utils/constants/navigation'
import theme from './utils/theme/themeOverride'

const App: React.FC = () => {
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

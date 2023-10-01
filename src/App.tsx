import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import Dashboard from './pages/Dashboard'
import Problems from './pages/Problems'
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
              {/* TODO: Create a route with path "/" for an element that
                  redirects to the appropriate page */}
              <Route path={Paths.Dashboard} element={<Dashboard />} />
              <Route path={Paths.Problems} element={<Problems />} />
              {/* TODO: Create a route with path "*" for an Error 404 page */}
            </Routes>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

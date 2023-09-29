import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import GuestNavigationBar from './components/Navigation/GuestNavigationBar'
import Dashboard from './pages/Dashboard'
import Problems from './pages/Problems'
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
              <Route path="/" element={<Dashboard />} />
              <Route path="problems" element={<Problems />} />
            </Routes>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </div>
  )
}

export default App

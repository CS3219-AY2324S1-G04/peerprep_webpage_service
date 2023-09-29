import { PropsWithChildren } from 'react'

import Header from './Header'
import Main from './Main'
import Root from './Root'

const Layout = ({ children }: PropsWithChildren<object>) => {
  return { children }
}

Layout.Root = Root
Layout.Header = Header
Layout.Main = Main

export default Layout

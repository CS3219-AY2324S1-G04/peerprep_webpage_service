import { PropsWithChildren } from 'react'

import Background from './Background'
import Header from './Header'
import Main from './Main'
import Root from './Root'

const Layout = ({ children }: PropsWithChildren<object>) => {
  return { children }
}

Layout.Root = Root
Layout.Header = Header
Layout.Main = Main
Layout.Background = Background

export default Layout

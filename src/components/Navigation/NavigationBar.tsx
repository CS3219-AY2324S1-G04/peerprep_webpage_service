import { Box, BoxProps } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { Fragment, PropsWithChildren } from 'react'

import { combineStyles } from '../../utils/theme/styles'

interface NavigationBarProps {
  children: React.ReactNode
}

interface NavBarRightColumnProps extends PropsWithChildren {
  wrapperClass?: SxProps
}

interface NavBarLeftColumnProps extends BoxProps {
  wrapperClass?: SxProps
  children: React.ReactNode
}

const NavigationBar = (props: NavigationBarProps) => {
  const { children } = props

  return (
    <Fragment>
      <Box sx={styles.root}>{children}</Box>
    </Fragment>
  )
}

NavigationBar.Left = function NavBarLeftColumn(props: NavBarLeftColumnProps) {
  const { children, wrapperClass, ...rest } = props
  return (
    <Box sx={combineStyles(styles.leftColumn, wrapperClass)} {...rest}>
      {children}
    </Box>
  )
}

NavigationBar.Middle = function NavBarMiddleColumn(props: PropsWithChildren) {
  return <Box sx={styles.middleColumn}>{props.children}</Box>
}

NavigationBar.Right = function NavBarRightColumn(
  props: NavBarRightColumnProps,
) {
  return (
    <Box sx={styles.rightColumn}>
      <Box sx={combineStyles(styles.rightColumnWrapper, props.wrapperClass)}>
        {props.children}
      </Box>
    </Box>
  )
}

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    width: '100%',
  } as SxProps,
  leftColumn: {
    gridColumn: '1 / 2',
    // display: {
    //   xs: 'none',
    //   sm: 'flex',
    // },
  } as SxProps,
  middleColumn: {
    gridColumn: '2 / 3',
    paddingTop: 1,
    justifySelf: 'center',
  } as SxProps,
  rightColumn: {
    gridColumn: '3 / 4',
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // display: {
    //   xs: 'none',
    //   sm: 'flex',
    // },
  } as SxProps,
  rightColumnWrapper: {
    width: '100%',
    display: 'flex',
    height: '80%',
    columnGap: '8px',
  } as SxProps,
} as const

export default NavigationBar

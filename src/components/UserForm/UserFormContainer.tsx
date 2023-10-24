import { Box, Sheet, Theme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import React, { PropsWithChildren } from 'react'

const UserFormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={styles.overallContainer}>
      <Sheet variant="soft" sx={styles.sheet}>
        {children}
      </Sheet>
    </Box>
  )
}

const styles = {
  overallContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '3.125rem 0rem',
  } as SxProps,
  sheet: ((theme: Theme) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: { xs: '0rem', sm: '3rem 4.5rem' },
      backgroundColor: {
        xs: 'rgba(0,0,0,0)',
        sm: theme.palette.background.surface,
      },
      boxShadow: { xs: '0rem', sm: 'sm' },
      borderRadius: 'md',
      width: 'min(32rem, 100%)',
    }
  }) as SxProps,
}

export default UserFormContainer

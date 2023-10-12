import { Box, Sheet, Theme } from '@mui/joy'
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
  },
  sheet: (theme: Theme) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: { xs: '0rem', sm: '3rem 4.5rem' },
      backgroundColor: {
        xs: 'rgba(0,0,0,0)',
        sm: theme.palette.neutral.softBg,
      },
      boxShadow: { xs: '0rem', sm: 'sm' },
      borderRadius: 'md',
    }
  },
}

export default UserFormContainer

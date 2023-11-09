import { Settings } from '@mui/icons-material'
import { Box, Button, Card, Sheet, Skeleton, Theme, Typography } from '@mui/joy'
import { useState } from 'react'

import Avatar from '../components/Avatar'
import AccountSettingsModal from '../features/accountSettingsEditor/components/AccountSettingsModal'
import { getUserProfile } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { UserProfile, UserRole } from '../services/userService'
import { AvatarShape } from '../utils/types'

const Dashboard: React.FC = () => {
  return (
    <Box sx={generalStyles.overallContainer}>
      <Box sx={generalStyles.gridContainer}>
        <ProfileCard />

        {/* TODO: Replace placeholders. */}
        <Card variant="soft" sx={placeholderCard2Styles.card}>
          Metric 2
        </Card>
        <Card variant="soft" sx={placeholderCard3Styles.card}>
          Metric 3
        </Card>
        <Card variant="soft" sx={placeholderCard3Styles.card}>
          Metric 4
        </Card>
      </Box>
    </Box>
  )
}

const ProfileCard: React.FC = () => {
  const profile: UserProfile | undefined = useAppSelector(getUserProfile)

  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
    useState(false)

  return (
    <Card variant="soft" sx={profileCardStyles.card}>
      <Box sx={profileCardStyles.profileContainer}>
        <Avatar
          alt={profile?.username}
          size={6.25}
          shape={AvatarShape.squircleMd}
        />
        <Box sx={profileCardStyles.profileInfo}>
          <Typography noWrap={true} sx={profileCardStyles.username}>
            {profile?.username === undefined ? (
              <Skeleton>Username</Skeleton>
            ) : (
              profile!.username
            )}
          </Typography>

          <Typography noWrap={true} sx={profileCardStyles.email}>
            {profile?.emailAddress === undefined ? (
              <Skeleton>Email address</Skeleton>
            ) : (
              profile!.emailAddress
            )}
          </Typography>

          {profile?.userRole === undefined ? (
            <Typography>
              <Skeleton>role</Skeleton>
            </Typography>
          ) : (
            <Sheet
              variant="outlined"
              color={(() => {
                switch (profile?.userRole) {
                  case UserRole.admin:
                    return 'danger'
                  case UserRole.maintainer:
                    return 'warning'
                  default:
                    return 'primary'
                }
              })()}
              sx={profileCardStyles.userRole}
            >
              {profile.userRole}
            </Sheet>
          )}
        </Box>
      </Box>

      <Button
        onClick={() => setIsAccountSettingsModalOpen(true)}
        startDecorator={<Settings />}
      >
        Account Settings
      </Button>
      <AccountSettingsModal
        isOpen={isAccountSettingsModalOpen}
        setIsOpen={setIsAccountSettingsModalOpen}
      />
    </Card>
  )
}

const generalStyles = {
  overallContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '1rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: { sm: '1fr', md: '1fr 2fr' },
    width: '100%',
    maxWidth: '72rem',
    gap: '1rem',
  },
  card: (theme: Theme) => {
    return {
      backgroundColor: theme.palette.background.surface,
      boxShadow: 'sm',
    }
  },
}

const profileCardStyles = {
  card: [
    generalStyles.card,
    {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  ],
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: '1',
  },
  username: {
    width: '0px',
    minWidth: '100%',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  email: {
    width: '0px',
    minWidth: '100%',
  },
  userRole: {
    padding: '0px 4px',
    marginTop: '0.25rem',
    borderRadius: 'sm',
  },
}

const placeholderCard2Styles = {
  card: generalStyles.card,
}

const placeholderCard3Styles = {
  card: [generalStyles.card, { gridColumn: '1 / -1' }],
}

export default Dashboard

import { PersonRounded } from '@mui/icons-material'
import { AspectRatio, Box, Card, Sheet, Skeleton, Typography } from '@mui/joy'

import AccountSettingsModal from '../features/accountSettingsEditor/AccountSettingsModal'
import { selectProfile } from '../features/userInfo/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { UserProfile, UserRole } from '../services/userService'

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
  const profile: UserProfile | undefined = useAppSelector(selectProfile)

  return (
    <Card variant="soft" sx={profileCardStyles.card}>
      <Box sx={profileCardStyles.profileContainer}>
        <AspectRatio
          variant="outlined"
          ratio="1"
          sx={profileCardStyles.profilePicture}
        >
          <PersonRounded />
        </AspectRatio>
        <Box sx={profileCardStyles.profileInfo}>
          <Typography noWrap={true} sx={profileCardStyles.username}>
            {profile?.username === undefined ? (
              <Skeleton>Username</Skeleton>
            ) : (
              profile!.username
            )}
          </Typography>

          <Typography noWrap={true} sx={profileCardStyles.email}>
            {profile?.email === undefined ? (
              <Skeleton>Email</Skeleton>
            ) : (
              profile!.email
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
      <AccountSettingsModal />
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
}

const profileCardStyles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: 'sm',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
  profilePicture: {
    width: '6.25rem',
    borderRadius: 'md',
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
  card: { boxShadow: 'sm' },
}

const placeholderCard3Styles = {
  card: { gridColumn: '1 / -1', boxShadow: 'sm' },
}

export default Dashboard

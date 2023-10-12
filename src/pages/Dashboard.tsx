import { PersonRounded } from '@mui/icons-material'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Modal,
  ModalDialog,
  ModalOverflow,
  Sheet,
  Skeleton,
  Typography,
} from '@mui/joy'
import { useState } from 'react'

import { FieldInfo } from '../components/Form/FormField'
import EmailField from '../components/UserForm/EmailField'
import UsernameField from '../components/UserForm/UsernameField'
import { selectProfile } from '../features/userInfo/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { UserProfile, UserRole } from '../services/userService'

// TODO: Add cards for other metrics
const Dashboard: React.FC = () => {
  return (
    <Box sx={generalStyles.overallContainer}>
      <Box sx={generalStyles.rowContainer}>
        <ProfileCard />
      </Box>
    </Box>
  )
}

const ProfileCard: React.FC = () => {
  const profile: UserProfile | undefined = useAppSelector(selectProfile)

  return (
    <Card variant="soft" sx={profileCardStyles.card}>
      <Box sx={profileCardStyles.infoContainer}>
        <AspectRatio
          variant="outlined"
          ratio="1"
          sx={profileCardStyles.profilePicture}
        >
          <PersonRounded />
        </AspectRatio>
        <Box sx={profileCardStyles.profileTextInfoContainer}>
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

          <Box height="4px" />

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

      <EditProfileModal />
    </Card>
  )
}

const EditProfileModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [emailFieldInfo, setEmailFieldInfo] = useState<FieldInfo>({ value: '' })
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disableScrollLock={true}
      >
        <ModalOverflow>
          <ModalDialog
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '400px',
            }}
          >
            <Typography
              textAlign="center"
              sx={{ fontWeight: 'bold', fontSize: '24px' }}
            >
              Edit Profile
            </Typography>
            <EmailField
              fieldInfo={emailFieldInfo}
              setFieldInfo={setEmailFieldInfo}
            />
            <UsernameField
              fieldInfo={usernameFieldInfo}
              setFieldInfo={setUsernameFieldInfo}
            />
            <Button>Save Changes</Button>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  )
}

const generalStyles = {
  overallContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '16px',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: '16px',
  },
}

const profileCardStyles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'sm',
    gap: '16px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    minWidth: '300px',
    maxWidth: '300px',
  },
  profilePicture: {
    minWidth: '100px',
    maxWidth: '100px',
    borderRadius: 'md',
  },
  profileTextInfoContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  username: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    width: '0px',
    minWidth: '100%',
  },
  email: {
    width: '0px',
    minWidth: '100%',
  },
  userRole: {
    padding: '0px 4px',
    borderRadius: 'sm',
  },
}

export default Dashboard

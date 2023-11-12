import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Sheet, Stack, Theme, Typography } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { PropsWithChildren } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

interface ChatPaneProps extends PropsWithChildren {
  title: string
  onClose: () => void
}

export const ChatPane = (props: ChatPaneProps) => {
  const { title, onClose, children } = props

  return (
    <Sheet sx={styles.sheet} variant='outlined'>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold" p={1.5}>{title}</Typography>
        <IconButton size="sm" onClick={() => { onClose() }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {children}
    </Sheet>
  )
}

ChatPane.Messages = ChatMessages
ChatPane.Input = ChatInput

const styles = {
  sheet: ((theme: Theme) => {
    return {
      borderRadius: '10px',
      width: '350px',
      marginBottom: '1rem',
      [theme.breakpoints.down('md')]: {
        width: '280px',
      },
    }
  }) as SxProps,
} as const

export default ChatPane

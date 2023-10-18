import WarningIcon from '@mui/icons-material/Warning'
import { toast as sonnerToast } from 'sonner'

type Toast = typeof sonnerToast & {
  warn: typeof sonnerToast.error
}

const toast: Toast = sonnerToast as Toast

toast.warn = (message, data) =>
  toast(message, {
    ...data,
    className: 'sonner-toast-warn',
    icon: <WarningIcon />,
  })

export { toast }

import { Global, css } from '@emotion/react'
import { useTheme } from '@mui/joy'
import { Toaster as SonnerToaster } from 'sonner'

export const Toaster: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <Global
        styles={css`
          .sonner-toast {
            --normal-bg: ${theme.vars.palette.primary.softBg} --normal-border:
              ${theme.vars.palette.primary.outlinedBorder} --normal-text:
              ${theme.vars.palette.text.primary} --success-bg:
              ${theme.vars.palette.success.solidBg} --success-border:
              ${theme.vars.palette.success.outlinedBorder} --success-text:
              ${theme.vars.palette.success.solidColor} --error-bg:
              ${theme.vars.palette.danger.solidBg} --error-border:
              ${theme.vars.palette.danger.outlinedBorder} --error-text:
              ${theme.vars.palette.danger.solidColor} font-family:
              ${theme.fontFamily} font-size: ${theme.fontSize.md};
          }

          .sonner-toast-warn {
            --normal-bg: ${theme.vars.palette.warning.solidBg} --normal-border:
              ${theme.vars.palette.warning.outlinedBorder} --normal-text:
              ${theme.vars.palette.warning.solidColor};
          }
        `}
      />
      <SonnerToaster
        richColors
        closeButton
        toastOptions={{
          className: 'sonner-toast',
        }}
      />
    </>
  )
}

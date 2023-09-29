import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import IconButton from '@mui/joy/IconButton'
import { useColorScheme } from '@mui/joy/styles'
import { useEffect, useState } from 'react'

const ColorSchemeToggle: React.FC = () => {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <IconButton size="sm" variant="soft" color="neutral" />
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark')
        } else {
          setMode('light')
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  )
}

export default ColorSchemeToggle

import { Box, useColorScheme, useTheme } from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery'
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import CodeMirror, { Extension } from '@uiw/react-codemirror'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as Y from 'yjs'

import './CodeArea.css'

function CodeArea({
  text,
  editorExtensions,
}: {
  text: Y.Text
  editorExtensions: Extension[]
}) {
  const theme = useTheme()
  const boxRef = useRef<HTMLDivElement>(null)
  const { mode } = useColorScheme()
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [value, setValue] = useState(text.toString())
  const [parentHeight, setParentHeight] = useState(800)

  useEffect(() => {
    if (boxRef && boxRef.current) {
      setParentHeight(boxRef.current.clientHeight)
    }
  }, [])

  const onChange = useCallback(
    (val: string) => {
      setValue(val)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  )

  return (
    <Box
      ref={boxRef}
      height="100%"
      minHeight={isTabletOrMobile ? '800px' : 'unset'}
    >
      <CodeMirror
        value={value}
        minHeight={`${parentHeight}px`}
        maxHeight={`${parentHeight}px`}
        theme={mode === 'light' ? noctisLilac : tokyoNight}
        extensions={editorExtensions}
        onChange={onChange}
      />
    </Box>
  )
}

export default CodeArea

import { Box, useColorScheme } from '@mui/joy'
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import CodeMirror, { Extension } from '@uiw/react-codemirror'
import React from 'react'
import * as Y from 'yjs'

import './CodeArea.css'

function CodeArea({
  text,
  editorExtensions,
}: {
  text: Y.Text
  editorExtensions: Extension[]
}) {
  const { mode } = useColorScheme()
  const [value, setValue] = React.useState(text.toString())

  const onChange = React.useCallback(
    (val: string) => {
      setValue(val)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  )

  return (
    <Box>
      <CodeMirror
        value={value}
        minHeight={'800px'}
        theme={mode === 'light' ? noctisLilac : tokyoNight}
        extensions={editorExtensions}
        onChange={onChange}
      />
    </Box>
  )
}

export default CodeArea

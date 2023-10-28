import { useColorScheme } from '@mui/joy'
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import CodeMirror, { Extension } from '@uiw/react-codemirror'
import React from 'react'
import * as Y from 'yjs'

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
    (val) => {
      setValue(value)
    },
    [value],
  )

  return (
    <div>
      <CodeMirror
        value={value}
        theme={mode === 'light' ? noctisLilac : tokyoNight}
        extensions={editorExtensions}
        onChange={onChange}
      />
    </div>
  )
}

export default CodeArea

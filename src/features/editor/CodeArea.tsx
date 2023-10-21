import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { Extension } from '@uiw/react-codemirror'
import React from 'react'
import * as Y from 'yjs'

export default function CodeArea({
  text,
  editorExtensions,
}: {
  text: Y.Text
  editorExtensions: Extension[]
}) {
  const [value, setValue] = React.useState(text.toString())

  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(value)
  }, [])

  return (
    <div>
      <CodeMirror
        value={value}
        width="800px"
        height="600px"
        theme={dracula}
        extensions={editorExtensions}
        onChange={onChange}
      />
    </div>
  )
}

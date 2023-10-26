import { dracula } from '@uiw/codemirror-theme-dracula'
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
  const [value, setValue] = React.useState(text.toString())

  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(value)
  }, [])

  return (
    <div>
      <CodeMirror
        value={value}
        height="auto"
        theme={dracula}
        extensions={editorExtensions}
        onChange={onChange}
      />
    </div>
  )
}

export default CodeArea

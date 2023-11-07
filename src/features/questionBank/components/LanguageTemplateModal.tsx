import {
  Box,
  Button,
  DialogActions,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  useColorScheme,
} from '@mui/joy'
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import CodeMirror from '@uiw/react-codemirror'
import { useCallback, useEffect, useState } from 'react'

import { Template } from '../../../services/questionService'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (updatedTemplate: Template) => void
  template: Template
  isEditMode?: boolean
}

const LanguageTemplateModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose, onSave, template, isEditMode } = props
  const { mode } = useColorScheme()

  const [value, setValue] = useState('')

  useEffect(() => {
    if (template) {
      setValue(template?.code ?? '')
    }
  }, [template])

  const onChange = useCallback(
    (val: string) => {
      setValue(val)
    },
    [value],
  )

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modelDialog}>
        <Box display="flex" alignItems="baseline">
          <ModalClose variant="plain" sx={styles.modelClose} />
          <Typography level="h3">
            {isEditMode ? 'Edit' : 'Add'} language template for{' '}
            {template.language ?? ''}
          </Typography>
        </Box>
        <CodeMirror
          value={value}
          theme={mode === 'light' ? noctisLilac : tokyoNight}
          onChange={onChange}
          minHeight="400px"
          maxHeight="400px"
          maxWidth="100%"
        />
        <DialogActions>
          <Button
            variant="solid"
            color="primary"
            onClick={() => {
              onSave({ ...template, code: value })
              onClose()
            }}
          >
            {isEditMode ? 'Save' : 'Add'}
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => {
              onClose()
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modelDialog: {
    maxWidth: 700,
    width: '100%',
    overflowY: 'auto',
  },
  modelClose: {
    m: 1,
  },
  complexityText: {
    ml: 1,
    fontWeight: 'bold',
  },
  categoriesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 1,
    rowGap: 1,
    flexDirection: 'row',
  },
} as const

export default LanguageTemplateModal

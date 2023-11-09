import {
  Autocomplete,
  Box,
  Button,
  Chip,
  ChipDelete,
  FormHelperText,
  Stack,
  useColorScheme,
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import MDEditor from '@uiw/react-md-editor'
import { useEffect, useMemo, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'

import FormField, { FieldInfo } from '../../../components/Form/FormField'
import GenericField, {
  GenericFieldInfo,
} from '../../../components/Form/GenericField'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Language, Template } from '../../../services/questionService'
import { validateStringInput } from '../../../utils/uiHelpers'
import { getCategories, getLanguages } from '../selectors'
import { Question, QuestionComplexity } from '../types'
import LanguageTemplateModal from './LanguageTemplateModal'
import SelectComplexity from './SelectComplexity'

interface QuestionFormProps {
  onSubmit: (question: Question) => void
  question?: Question
  submitLoading?: boolean
}

const EMPTY_TEMPLATE = { langSlug: '', language: '', code: '' }

const QuestionForm: React.FC<QuestionFormProps> = (
  props: QuestionFormProps,
) => {
  const { onSubmit, submitLoading, question } = props
  const { mode } = useColorScheme()
  const allCategories = useAppSelector(getCategories)
  const allLanguages = useAppSelector(getLanguages)

  // template state handlers
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false)
  const [languageInput, setLanguageInput] = useState<Language | null>(null)
  const [templateToEdit, setTemplateToEdit] = useState<Template>(EMPTY_TEMPLATE)
  const [templateEditMode, setTemplateEditMode] = useState<boolean>(false)
  const [templates, setTemplates] = useState<Template[]>([])

  const [categoriesFieldInfo, setCategoriesFieldInfo] = useState<
    GenericFieldInfo<string[]>
  >({
    value: [],
  })
  const [titleFieldInfo, setTitleFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [complexity, setComplexity] = useState<QuestionComplexity>(
    QuestionComplexity.Easy,
  )
  const [descriptionFieldInfo, setDescriptionFieldInfo] = useState<FieldInfo>({
    value: '',
  })

  useEffect(() => {
    if (question) {
      setTitleFieldInfo({ value: question.title })
      setComplexity(question.complexity)
      setCategoriesFieldInfo({ value: question.categories })
      setDescriptionFieldInfo({ value: question.description ?? '' })
      setTemplates(question.template)
    }
  }, [question])

  const canSubmit = useMemo(() => {
    const titleValid = titleFieldInfo.value.length > 0
    const categoriesValid = categoriesFieldInfo.value.length > 0
    const descriptionValid = descriptionFieldInfo.value.length > 0
    return titleValid && categoriesValid && descriptionValid
  }, [titleFieldInfo, categoriesFieldInfo, descriptionFieldInfo])

  return (
    <>
      <Stack gap={1.5}>
        <FormField
          label="Title"
          info={titleFieldInfo}
          setInfo={setTitleFieldInfo}
          placeholder="Question Title"
          validate={(toValidate) => {
            return validateStringInput(toValidate, 'Title')
          }}
          size="lg"
          validateOnBlur
        />
        <SelectComplexity value={complexity} setValue={setComplexity} />
        <GenericField
          label="Categories"
          errorMessage={categoriesFieldInfo.errorMessage}
        >
          <Autocomplete
            multiple
            placeholder="Choose question categories"
            options={allCategories}
            value={categoriesFieldInfo.value}
            onChange={(_, updatedSelectedCategories) => {
              if (updatedSelectedCategories.length === 0) {
                setCategoriesFieldInfo({
                  value: updatedSelectedCategories,
                  errorMessage: 'At least 1 category is required',
                })
              } else {
                setCategoriesFieldInfo({
                  value: updatedSelectedCategories,
                  errorMessage: '',
                })
              }
            }}
            onBlur={() => {
              if (categoriesFieldInfo.value.length === 0) {
                setCategoriesFieldInfo({
                  value: [],
                  errorMessage: 'At least 1 category is required',
                })
              }
            }}
            renderTags={(tags, getTagProps) =>
              tags.map((item, index) => {
                const { onClick, ...rest } = getTagProps({ index })
                return (
                  <Chip
                    color="primary"
                    endDecorator={<ChipDelete onDelete={onClick} />}
                    {...rest}
                  >
                    {item}
                  </Chip>
                )
              })
            }
          />
        </GenericField>
        <GenericField
          label="Description"
          errorMessage={descriptionFieldInfo.errorMessage}
        >
          <div data-color-mode={mode}>
            <MDEditor
              className={!descriptionFieldInfo.errorMessage ? '' : 'error'}
              height={300}
              value={descriptionFieldInfo.value}
              onChange={(value) => {
                const errorMessage =
                  value?.trim() === '' ? 'Description is required' : ''

                setDescriptionFieldInfo({ value: value ?? '', errorMessage })
              }}
              preview="edit"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </GenericField>
        <FormHelperText>
          Note that you can use markdown syntax for the description
        </FormHelperText>
        <GenericField label="Language Templates">
          <Box display="flex" gap={1}>
            <Autocomplete
              sx={styles.languageAutocomplete}
              placeholder="Add templates"
              options={allLanguages}
              getOptionLabel={(option) => option.language}
              value={languageInput}
              onChange={(_, updated) => {
                setLanguageInput(updated)
                if (updated) {
                  setTemplateToEdit({ ...updated, code: '' })
                } else {
                  setTemplateToEdit(EMPTY_TEMPLATE)
                }
              }}
            />
            <Button
              disabled={!languageInput}
              onClick={() => {
                setTemplateEditMode(false)
                setIsTemplateModalOpen(true)
              }}
            >
              Add
            </Button>
          </Box>
        </GenericField>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {templates.map((t) => (
            <Chip
              key={t.langSlug}
              onClick={() => {
                setTemplateEditMode(true)
                setTemplateToEdit(t)
                setIsTemplateModalOpen(true)
              }}
              color="primary"
              variant="outlined"
              endDecorator={
                <ChipDelete
                  onClick={() => {
                    const filtered = templates.filter(
                      (current) => t.langSlug !== current.langSlug,
                    )
                    setTemplates(filtered)
                  }}
                />
              }
            >
              {t.language}
            </Chip>
          ))}
        </Box>
        <Button
          sx={styles.createButton}
          disabled={!canSubmit}
          loading={submitLoading}
          onClick={() => {
            const questionToSubmit: Question = {
              _id: question?._id ?? '',
              title: titleFieldInfo.value,
              description: descriptionFieldInfo.value,
              complexity: complexity,
              categories: categoriesFieldInfo.value,
              template: templates,
            }
            onSubmit(questionToSubmit)
          }}
        >
          {question ? 'Save' : 'Create'}
        </Button>
      </Stack>
      <LanguageTemplateModal
        isEditMode={templateEditMode}
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        template={templateToEdit}
        onSave={(updatedTemplate) => {
          const updated = templates
          updated.push(updatedTemplate)
          setTemplates(updated)
          setLanguageInput(null)
          setTemplateToEdit(EMPTY_TEMPLATE)
        }}
      />
    </>
  )
}

const styles = {
  wrapper: {
    margin: 'auto',
    width: '60%',
    maxWidth: '600px',
  } as SxProps,
  sheet: {
    borderRadius: '10px',
    padding: 3,
  } as SxProps,
  backButton: {
    maxWidth: '100px',
  } as SxProps,
  formTitle: {
    marginBottom: '1rem',
  } as SxProps,
  helpIcon: {
    fontSize: 'large',
    cursor: 'help',
  },
  descriptionLabel: {
    alignItems: 'center',
  } as SxProps,
  descriptionTooltip: {
    maxWidth: '240px',
  } as SxProps,
  languageAutocomplete: {
    width: '100%',
  } as SxProps,
  createButton: {
    mt: 4,
  } as SxProps,
} as const

export default QuestionForm

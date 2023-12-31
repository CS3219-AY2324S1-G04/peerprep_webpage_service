import { Box, Stack, Typography, useColorScheme } from '@mui/joy'
import { Card } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import MDEditor from '@uiw/react-md-editor'

import StyledChip from '../../../components/Chip'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getComplexityColor } from '../../../utils/uiHelpers'
import { getQuestionData } from '../selectors'

const RoomQuestion = () => {
  const { mode } = useColorScheme()
  const question = useAppSelector(getQuestionData)

  if (!question) {
    return <Card> </Card>
  }

  return (
    <Card sx={{ height: '100%', overflow: 'auto' }}>
      <Box display="flex" alignItems="baseline">
        <Typography level="h2">
          {question.title}
          <Typography
            level="body-lg"
            component="span"
            color={getComplexityColor(question.complexity)}
            sx={styles.complexityText}
          >
            {question.complexity}
          </Typography>
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Box sx={styles.categoriesBox}>
          {question.categories.map((category: string) => (
            <StyledChip key={category}>{category}</StyledChip>
          ))}
        </Box>
        <div data-color-mode={mode}>
          <MDEditor.Markdown source={question.description} />
        </div>
      </Stack>
    </Card>
  )
}

const styles = {
  complexityText: {
    ml: 1,
    fontWeight: 'bold',
  } as SxProps,
  categoriesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 1,
    rowGap: 1,
    flexDirection: 'row',
  } as SxProps,
} as const

export default RoomQuestion

import { Box, Skeleton, Stack, Typography, useColorScheme } from '@mui/joy'
import { Card } from '@mui/joy'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'
import { useEffect, useState } from 'react'

import StyledChip from '../../../components/Chip'
import { getRoom } from '../../../services/roomService'
import { getComplexityColor } from '../../../utils/uiHelpers'
import { Question } from '../../questionBank/types'

const RoomQuestion = ({ roomId }: { roomId: string }) => {
  const { mode } = useColorScheme()
  const [question, setQuestion] = useState<Question | null>(null)

  // TODO: Create sagas to handle async logic.
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const room = await getRoom(roomId)
        if (!room) {
          throw new Error('room not found')
        }
        const res = await axios.get(
          `http://localhost:9001/question-service/questions/${room.questionId}`,
        )
        const question = res.data.data
        setQuestion(question)
      } catch (error) {
        setQuestion(null)
      }
    }

    getQuestion()
  }, [roomId])

  if (!question) {
    return <Skeleton></Skeleton>
  }

  return (
    <Card>
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
  },
  categoriesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 1,
    rowGap: 1,
    flexDirection: 'row',
  },
} as const

export default RoomQuestion

import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'

import TableContainer from '../components/TableContainer/TableContainer'
import ProblemsTable from '../features/questionBank/components/ProblemsTable'
import QuestionDetailsModal from '../features/questionBank/components/QuestionDetailsModal'
import { getQuestionsList } from '../features/questionBank/selectors'
import { useAppSelector } from '../hooks/useAppSelector'

const Questions: React.FC = () => {
  const questionsList = useAppSelector(getQuestionsList)

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="Questions"
          chipLabel={`${questionsList.length} questions`}
          headerStyles={styles.header}
        ></TableContainer.Header>
        <TableContainer.Body>
          <ProblemsTable onQuestionClick={() => setIsDetailsModalOpen(true)} />
        </TableContainer.Body>
      </TableContainer>
      <QuestionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </>
  )
}

const styles = {
  header: {
    justifyContent: 'space-between',
  } as SxProps,
} as const

export default Questions

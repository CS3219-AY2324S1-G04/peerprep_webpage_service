import { useState } from 'react'

import TableContainer from '../components/TableContainer/TableContainer'
import ProblemsTable from '../features/questionBank/components/ProblemsTable'
import QuestionDetailsModal from '../features/questionBank/components/QuestionDetailsModal'
import { getQuestionsList } from '../features/questionBank/selectors'
import { useAppSelector } from '../hooks/useAppSelector'

const Problems: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const questionsList = useAppSelector(getQuestionsList)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="Problems"
          chipLabel={`${questionsList.length} questions`}
        />
        <TableContainer.Body>
          <ProblemsTable onQuestionClick={() => setIsDialogOpen(true)} />
        </TableContainer.Body>
      </TableContainer>
      <QuestionDetailsModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}

export default Problems

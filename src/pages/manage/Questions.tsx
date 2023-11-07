import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TableContainer from '../../components/TableContainer/TableContainer'
import CreateQuestionModal from '../../features/questionBank/components/LanguageTemplateModal'
import ProblemsTable from '../../features/questionBank/components/ProblemsTable'
import QuestionDetailsModal from '../../features/questionBank/components/QuestionDetailsModal'
import { getQuestionsList } from '../../features/questionBank/selectors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { SubPaths } from '../../utils/constants/navigation'

const Questions: React.FC = () => {
  const navigate = useNavigate()
  const questionsList = useAppSelector(getQuestionsList)

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="Questions"
          chipLabel={`${questionsList.length} questions`}
          headerStyles={styles.header}
        >
          <Button
            size="md"
            startDecorator={<AddIcon />}
            onClick={() => navigate(SubPaths.CreateQuestion)}
          >
            Create Question
          </Button>
        </TableContainer.Header>
        <TableContainer.Body>
          <ProblemsTable
            adminMode
            onQuestionClick={() => setIsDetailsModalOpen(true)}
          />
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

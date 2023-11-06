import { Button } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'

import TableContainer from '../components/TableContainer/TableContainer'
import FindingRoomModal from '../features/matching/components/FindingRoomModal'
import JoinQueueSettingsModal from '../features/matching/components/JoinQueueSettingsModal'
import ProblemsTable from '../features/questionBank/components/ProblemsTable'
import QuestionDetailsModal from '../features/questionBank/components/QuestionDetailsModal'
import { getQuestionsList } from '../features/questionBank/selectors'
import { getIsLoggedIn } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'

const Problems: React.FC = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isPrepModalOpen, setIsPrepModalOpen] = useState<boolean>(false)
  const questionsList = useAppSelector(getQuestionsList)
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="Problems"
          chipLabel={`${questionsList.length} questions`}
          headerStyles={styles.header}
        >
          {isLoggedIn && (
            <Button size="md" onClick={() => setIsPrepModalOpen(true)}>
              PeerPrep💪🏼
            </Button>
          )}
        </TableContainer.Header>
        <TableContainer.Body>
          <ProblemsTable onQuestionClick={() => setIsDetailsModalOpen(true)} />
        </TableContainer.Body>
      </TableContainer>
      <QuestionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      <JoinQueueSettingsModal
        isOpen={isPrepModalOpen}
        onClose={() => setIsPrepModalOpen(false)}
      />
    </>
  )
}

const styles = {
  header: {
    justifyContent: 'space-between',
  } as SxProps,
} as const

export default Problems

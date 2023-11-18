import { Box, Button, CircularProgress } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'

import TableContainer from '../components/TableContainer/TableContainer'
import JoinQueueSettingsModal from '../features/matching/components/JoinQueueSettingsModal'
import ProblemsTable from '../features/questionBank/components/ProblemsTable'
import QuestionDetailsModal from '../features/questionBank/components/QuestionDetailsModal'
import { getQuestionsList } from '../features/questionBank/selectors'
import { getRoomStatus } from '../features/room/selectors'
import { RoomStatus } from '../features/room/types'
import { getIsLoggedIn } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import useTaskSubscriber from '../hooks/useTaskSubscriber'
import { LoadingKeys } from '../utils/types'

const Problems: React.FC = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isPrepModalOpen, setIsPrepModalOpen] = useState<boolean>(false)
  const [isFetching] = useTaskSubscriber(LoadingKeys.FETCHING_ALL_QUESTIONS)
  const questionsList = useAppSelector(getQuestionsList)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const roomStatus = useAppSelector(getRoomStatus)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="Problems"
          chipLabel={isFetching ? (
            <Box display="flex" alignItems="center">
              <CircularProgress size="sm" />
            </Box>
          ) : `${questionsList.length} questions`}
          headerStyles={styles.header}
        >
          {isLoggedIn && (
            <Button
              size="md"
              onClick={() => setIsPrepModalOpen(true)}
              disabled={roomStatus === RoomStatus.Open}
            >
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

import TableContainer from '../components/TableContainer/TableContainer'
import AttemptsTable from '../features/history/components/AttemptsTable'
import { getAllUserAttempts } from '../features/history/selectors'
import { useAppSelector } from '../hooks/useAppSelector'

const Attempts: React.FC = () => {
  const attemptsList = useAppSelector(getAllUserAttempts)

  return (
    <>
      <TableContainer>
        <TableContainer.Header
          title="My Attempts"
          chipLabel={`${attemptsList.length} ${
            attemptsList.length !== 1 ? 'attempts' : 'attempt'
          }`}
        />
        <TableContainer.Body>
          <AttemptsTable />
        </TableContainer.Body>
      </TableContainer>
    </>
  )
}

export default Attempts

import TableContainer from "../components/TableContainer/TableContainer"
import ProblemsTable from "../features/questionBank/components/ProblemsTable"
import { getQuestionsList } from "../features/questionBank/selectors"
import { useAppSelector } from "../hooks/useAppSelector"

const Problems: React.FC = () => {
  const questionsList = useAppSelector(getQuestionsList)

  return (
    <TableContainer>
      <TableContainer.Header title="Problems" chipLabel={`${questionsList.length} questions`} />
      <TableContainer.Body>
        <ProblemsTable />
      </TableContainer.Body>
    </TableContainer>
  )
}

export default Problems

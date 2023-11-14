import { Typography } from '@mui/joy'

import TableContainer from '../components/TableContainer/TableContainer'
import RankingsTable from '../features/history/components/RankingsTable'

const Rankings: React.FC = () => {
  return (
    <>
      <TableContainer sx={{ maxWidth: '500px' }}>
        <TableContainer.Header title="Rankings 🏆" />
        <TableContainer.Subheader>
          <Typography level="body-sm">
            Rankings are determined by the quantity of attempts, so don't
            delay—seize the opportunity to tackle additional problems alongside
            your peers!
          </Typography>
        </TableContainer.Subheader>
        <TableContainer.Body>
          <RankingsTable />
        </TableContainer.Body>
      </TableContainer>
    </>
  )
}

export default Rankings

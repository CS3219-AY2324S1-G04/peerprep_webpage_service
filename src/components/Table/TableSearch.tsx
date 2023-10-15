import { Input } from "@mui/joy"
import SearchIcon from '@mui/icons-material/Search'

interface TableSearchBoxProps {
  onChange: (value: string) => void,
  value: string
}

export const TableSearchBox: React.FC<TableSearchBoxProps> = (props: TableSearchBoxProps) => {
  const { value, onChange } = props
  return (
    <Input
      placeholder="Search.."
      startDecorator={<SearchIcon />}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

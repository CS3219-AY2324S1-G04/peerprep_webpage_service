import SearchIcon from '@mui/icons-material/Search'
import { Input, InputProps } from '@mui/joy'

export const SearchBox: React.FC<InputProps> = (props: InputProps) => {
  const { value, placeholder, ...rest } = props
  return (
    <Input
      {...rest}
      placeholder={placeholder ? placeholder : 'Search..'}
      startDecorator={<SearchIcon />}
      variant="outlined"
      value={value}
    />
  )
}

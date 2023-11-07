import { FormControl, FormLabel, Option, Select, Typography } from '@mui/joy'

import { getComplexityColor } from '../../../utils/uiHelpers'
import { QuestionComplexity } from '../types'

interface SelectComplexityProps {
  value: QuestionComplexity
  setValue: (value: QuestionComplexity) => void
  label?: string
}

const SelectComplexity: React.FC<SelectComplexityProps> = (
  props: SelectComplexityProps,
) => {
  const { value, setValue, label } = props

  return (
    <FormControl>
      <FormLabel>{label ? label : 'Complexity'}</FormLabel>
      <Select
        color={getComplexityColor(value)}
        value={value}
        onChange={(e, newValue) =>
          setValue(newValue ?? QuestionComplexity.Easy)
        }
      >
        <Option value={QuestionComplexity.Easy}>
          <Typography color={getComplexityColor(QuestionComplexity.Easy)}>
            {QuestionComplexity.Easy}
          </Typography>
        </Option>
        <Option value={QuestionComplexity.Medium}>
          <Typography color={getComplexityColor(QuestionComplexity.Medium)}>
            {QuestionComplexity.Medium}
          </Typography>
        </Option>
        <Option value={QuestionComplexity.Hard}>
          <Typography color={getComplexityColor(QuestionComplexity.Hard)}>
            {QuestionComplexity.Hard}
          </Typography>
        </Option>
      </Select>
    </FormControl>
  )
}

export default SelectComplexity

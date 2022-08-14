import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { baseColors } from '../../themes'

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: baseColors.secondary
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: baseColors.primary
  },
  '& .MuiFormLabel-root': {
    color: baseColors.textPrimary
  },
  '& .MuiFormHelperText-root': {
    color: baseColors.textSecondary
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFFFFF33',
      background: '#FFFFFF13'
    },
    '&:hover fieldset': {
      borderColor: baseColors.textPrimary
    },
    '&.Mui-focused fieldset': {
      borderColor: baseColors.secondary
    },
    '& .MuiInputBase-input': {
      color: baseColors.textPrimary
    }
  }
})

export default CustomTextField

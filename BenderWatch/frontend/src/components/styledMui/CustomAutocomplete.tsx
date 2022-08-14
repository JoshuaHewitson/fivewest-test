import styled from '@emotion/styled'
import { Autocomplete } from '@mui/material'
import { baseColors } from '../../themes'

const CustomAutocomplete = styled(Autocomplete)({
  '& label.Mui-focused': {
    color: baseColors.primary
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
      borderColor: baseColors.primary
    },
    '& .MuiInputBase-input': {
      color: baseColors.textPrimary
    }
  },
  '& .MuiChip-filled': {
    backgroundColor: baseColors.spot1
  },
  '& .MuiChip-label': {
    color: baseColors.textPrimary
  },
  '& .MuiButtonBase-root.MuiAutocomplete-clearIndicator': {
    color: baseColors.textPrimary
  }
})

export default CustomAutocomplete

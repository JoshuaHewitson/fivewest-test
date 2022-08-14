import { Button, CircularProgress, Dialog } from '@mui/material'
import { baseColors, gradient, Metrics } from '../../themes'
import Typography, { Display, Heading, Subheading } from '../Typography'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../styledMui/CustomTextField'
import { FC, useState } from 'react'
import { useCreatePatron } from '../../graphql/mutations/useCreatePatron'

const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    weight: Yup.number().required().typeError('you must specify a number')
  })
}

interface AddPatronFormProps {
  handleClose: Function
}

const AddPatronForm: FC<AddPatronFormProps> = ({ handleClose }) => {
  const [submitting, setSubmitting] = useState(false)
  const [createPatron] = useCreatePatron()
  return (
    <div
      style={{
        width: '100%',
        background: baseColors.subsectionBackground,
        padding: Metrics.base * 4
      }}
    >
      <div style={{ width: '100%' }}>
        <Heading mb={1}>New Patron</Heading>
        <Typography color={baseColors.textSecondary} mb={4}>
          Enter details below
        </Typography>
        <Formik
          onSubmit={(values) => {
            setSubmitting(true)
            typeof createPatron === 'function' &&
              createPatron({
                variables: { ...values, weight: Number(values.weight) }
              })
                .then(() => {
                  setSubmitting(false)
                  handleClose()
                })
                .catch(() => {
                  setSubmitting(false)
                })
          }}
          initialValues={{
            name: '',
            weight: ''
          }}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, errors, isValid, handleSubmit }) => (
            <>
              <CustomTextField
                style={{ width: '100%', marginBottom: Metrics.base * 2 }}
                value={values.name}
                onChange={(e: any) => setFieldValue('name', e.target.value)}
                label='Name'
                name='name'
                inputProps={{ error: errors.name }}
              />
              <CustomTextField
                style={{ width: '100%', marginBottom: Metrics.base * 2 }}
                value={values.weight}
                onChange={(e: any) => setFieldValue('weight', e.target.value)}
                label='Weight'
                name='weight'
                helperText={errors.weight}
                inputProps={{ error: errors.weight }}
              />
              <Button
                type='submit'
                variant='contained'
                onClick={() => handleSubmit()}
                disabled={
                  !isValid ||
                  values.name === '' ||
                  values.weight === '' ||
                  submitting
                }
                style={{
                  opacity: !isValid ? 0.4 : 1,
                  marginTop: Metrics.base * 2,
                  background: gradient
                }}
              >
                {submitting ? (
                  <CircularProgress style={{ color: baseColors.background }} />
                ) : (
                  <Typography color={baseColors.background}>
                    <b>Add Patron</b>
                  </Typography>
                )}
              </Button>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddPatronForm

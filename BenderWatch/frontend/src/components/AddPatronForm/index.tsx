import { Button, Dialog } from '@mui/material'
import { baseColors, gradient, Metrics } from '../../themes'
import Typography, { Display, Heading, Subheading } from '../Typography'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../styledMui/CustomTextField'
import { FC } from 'react'
import { Patron } from '../../containers'

const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    weight: Yup.number().required().typeError('you must specify a number')
  })
}

interface AddPatronFormProps {
  handleClose: Function
  setPatrons: Function
  patrons: Array<Patron>
}

const AddPatronForm: FC<AddPatronFormProps> = ({
  handleClose,
  setPatrons,
  patrons
}) => {
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
            setPatrons([...patrons, { ...values }])
            handleClose()
          }}
          initialValues={{
            name: '',
            weight: ''
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            setFieldValue,
            errors,
            isSubmitting,
            isValid,
            handleSubmit
          }) => (
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
                  !isValid || values.name === '' || values.weight === ''
                }
                style={{
                  opacity: !isValid ? 0.4 : 1,
                  marginTop: Metrics.base * 2,
                  background: gradient
                }}
              >
                <Typography color={baseColors.background}>
                  <b>Add Patron</b>
                </Typography>
              </Button>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddPatronForm

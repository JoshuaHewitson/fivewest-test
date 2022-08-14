import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { patronFragment } from '../queries/usePatrons'
import { notification } from '../reactiveVariables'

const mutationName = 'createPatron'
const successMessage = `Success: ${mutationName}`
const errorMessage = `Error: ${mutationName}`

export const MUTATION = gql`
  mutation ${mutationName}($name: String, $weight: Float) {
    ${mutationName}(name: $name, weight: $weight) {
        ...patronFragment
    }
}
${patronFragment}
`
export const useCreatePatron = () => {
  const [mutate, { loading }] = useMutation(MUTATION, {
    refetchQueries: ['patrons'],
    onCompleted: (data: any) => {
      notification({
        show: true,
        severity: 'success',
        message: successMessage
      })
    },
    onError: (error: any) => {
      notification({
        show: true,
        severity: 'error',
        message: errorMessage
      })
      throw new Error()
    }
  })
  return [mutate, { loading }]
}

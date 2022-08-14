import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { patronFragment } from '../queries/usePatrons'
import { notification } from '../reactiveVariables'

const mutationName = 'removePatron'
const successMessage = `Success: ${mutationName}`
const errorMessage = `Error: ${mutationName}`

export const MUTATION = gql`
  mutation ${mutationName}($patronId: String) {
    ${mutationName}(patronId: $patronId) {
      ...patronFragment
    }
}
${patronFragment}
`
export const useRemovePatron = () => {
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

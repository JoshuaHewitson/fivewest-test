import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { notification } from '../reactiveVariables'

const mutationName = 'addDrink'
const successMessage = `Success: ${mutationName}`
const errorMessage = `Error: ${mutationName}`

export const MUTATION = gql`
  mutation ${mutationName}($drinkId: String, $patronId: String) {
    ${mutationName}(drinkId: $drinkId, patronId: $patronId) {
        id
    }
}
`
export const useAddDrink = () => {
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

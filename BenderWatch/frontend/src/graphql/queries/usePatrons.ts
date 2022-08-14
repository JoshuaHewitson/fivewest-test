import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const queryName = 'patrons'
const typeName = 'Patron'

export type PatronDrink = {
  drinkId: string
  time: string
  millilitersAlcohol: number
}

export type Patron = {
  id: string
  name: string
  weight: string
  drinks: Array<PatronDrink>
  alcoholLevel: number
}
const defaultValue: Array<Patron> = []

export const patronFragment = gql`
  fragment patronFragment on ${typeName} {
    id
    name
    weight
    drinks {
        drinkId
        time
        millilitersAlcohol
    }
    alcoholLevel
  }
`

const QUERY = gql`
  query ${queryName}  {
    ${queryName} {
      ...patronFragment
    }
  }
  ${patronFragment}
`

interface transformProps {
  data: any
  queryName: string
}

export const dataTransform = ({ data, queryName }: transformProps) => {
  if (!queryName) return data
  return data[queryName].map((a: any) => ({
    ...a
  }))
}

export const usePatrons = () => {
  const [data, setData] = useState(defaultValue)
  const {
    data: queryData,
    loading,
    refetch
  } = useQuery(QUERY, {
    variables: {},
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (queryData && queryData[queryName])
      setData(dataTransform({ data: queryData, queryName }))
    else setData(defaultValue)
  }, [queryData])

  return { data, loading, refetch }
}

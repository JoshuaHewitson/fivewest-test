import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Drink, drinkFragment } from './useDrink'

const queryName = 'drinks'

const defaultValue: Array<Drink> = []

const QUERY = gql`
  query ${queryName}  {
    ${queryName} {
      ...drinkFragment
    }
  }
  ${drinkFragment}
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

export const useDrinks = () => {
  const [data, setData] = useState(defaultValue)
  const { data: queryData, loading } = useQuery(QUERY)

  useEffect(() => {
    if (queryData && queryData[queryName])
      setData(dataTransform({ data: queryData, queryName }))
    else setData(defaultValue)
  }, [queryData])

  return { data, loading }
}

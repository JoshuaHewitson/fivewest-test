import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const queryName = 'drinks'
const typeName = 'DrinkListItem'

export type DrinkListItem = {
  id: string
  label: string
  thumb: string
}
const defaultValue: Array<DrinkListItem> = []

export const drinkListItemFragment = gql`
  fragment drinkListItemFragment on ${typeName} {
    id: idDrink
    label: strDrink
    thumb: strDrinkThumb
  }
`

const QUERY = gql`
  query ${queryName}  {
    ${queryName} {
      ...drinkListItemFragment
    }
  }
  ${drinkListItemFragment}
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

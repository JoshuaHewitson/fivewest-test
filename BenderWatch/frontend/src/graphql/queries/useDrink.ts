import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const queryName = 'drink'
const typeName = 'Drink'

export type Ingredient = {
  name: string
  milliliters: number
}

export type Drink = {
  id: string
  label: string
  thumb: string
  ingredients: Array<Ingredient>
  millilitersAlcohol: number
}
const defaultValue: Drink | null = null

export const drinkFragment = gql`
  fragment drinkFragment on ${typeName} {
    id: idDrink
    label: strDrink
    thumb: strDrinkThumb
    ingredients {
      name
      milliliters
    }
    millilitersAlcohol
  }
`

const QUERY = gql`
  query ${queryName} ($drinkId: String) {
    ${queryName} (drinkId: $drinkId){
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
  return { ...data[queryName] }
}

interface queryProps {
  drinkId?: string | null
}

export const useDrink = ({ drinkId }: queryProps) => {
  const [data, setData] = useState(defaultValue)
  const [label, setLabel] = useState<string | null>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([])
  const [millilitersAlcohol, setMillilitersAlcohol] = useState<number | null>(
    null
  )
  const { data: queryData, loading } = useQuery(QUERY, {
    variables: {
      drinkId
    },
    skip: drinkId === undefined || drinkId === null
  })

  useEffect(() => {
    if (queryData && queryData[queryName]) {
      const temp = dataTransform({ data: queryData, queryName })
      setData(temp)
      setLabel(temp && temp.label ? temp.label : null)
      setThumb(temp && temp.thumb ? temp.thumb : null)
      setIngredients(temp && temp.ingredients ? temp.ingredients : [])
      setMillilitersAlcohol(
        temp && temp.millilitersAlcohol ? temp.millilitersAlcohol : []
      )
    } else {
      setData(defaultValue)
      setLabel(null)
      setThumb(null)
      setIngredients([])
    }
  }, [queryData])

  return { data, label, thumb, ingredients, millilitersAlcohol, loading }
}

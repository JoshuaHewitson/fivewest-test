import { CircularProgress } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { Drink, useDrink } from '../../graphql/queries/useDrink'
import { baseColors, gradient, Metrics } from '../../themes'
import Typography, { Display, Heading, Subheading } from '../Typography'

interface DrinkCardProps {
  drinkId: string
}

const DrinkCard: FC<DrinkCardProps> = ({ drinkId }) => {
  const { label, thumb, ingredients, millilitersAlcohol, loading } = useDrink({
    drinkId
  })
  return (
    <div
      style={{
        marginBottom: Metrics.base * 2,
        display: 'flex',
        alignItems: 'center'
        // justifyContent: 'space-between'
      }}
    >
      {loading ? (
        <CircularProgress
          style={{ color: baseColors.primary }}
        ></CircularProgress>
      ) : (
        <>
          {thumb && (
            <img
              style={{
                borderRadius: Metrics.radius,
                marginRight: Metrics.base * 3
              }}
              width={50}
              src={thumb}
              alt='thumb'
            ></img>
          )}
          <div>
            <Typography>{label}</Typography>
            <Typography>
              Alcohol content:{' '}
              {millilitersAlcohol && Math.round(millilitersAlcohol)}ml
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}

export default DrinkCard

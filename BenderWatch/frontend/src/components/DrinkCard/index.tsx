import { CircularProgress } from '@mui/material'
import { FC, useMemo } from 'react'
import { useDrink } from '../../graphql/queries/useDrink'
import { baseColors, Metrics } from '../../themes'
import Typography, { Title } from '../Typography'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en)

interface DrinkCardProps {
  drinkId: string
  time: string
  millilitersAlcohol: number
}

const DrinkCard: FC<DrinkCardProps> = ({
  drinkId,
  time,
  millilitersAlcohol
}) => {
  const { label, thumb, loading } = useDrink({
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch'
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Title mb={1} color={baseColors.textPrimary}>
                {label}
              </Title>
              <Typography color={baseColors.textSecondary}>
                Alcohol content:{' '}
                {millilitersAlcohol && Math.round(millilitersAlcohol)}ml
              </Typography>
            </div>
          </>
        )}
      </div>
      <Typography
        color={baseColors.textSecondary}
        style={{ minWidth: 120, textAlign: 'right' }}
      >
        {<ReactTimeAgo date={new Date(Number(time))} locale='en-ZA' />}
      </Typography>
    </div>
  )
}

export default DrinkCard

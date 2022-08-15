import { Button, CircularProgress } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useAddDrink } from '../../graphql/mutations/useAddDrink'
import { useRemovePatron } from '../../graphql/mutations/useRemovePatron'
import { Drink } from '../../graphql/queries/useDrink'
import { useDrinks } from '../../graphql/queries/useDrinks'
import { Patron } from '../../graphql/queries/usePatrons'
import { baseColors, gradient, Metrics } from '../../themes'
import DrinkCard from '../DrinkCard'
import CustomAutocomplete from '../styledMui/CustomAutocomplete'
import CustomTextField from '../styledMui/CustomTextField'
import Typography, { Heading, Subheading } from '../Typography'

const ListItem: FC<Drink> = ({ label, thumb }) => {
  return (
    <div
      style={{
        marginBottom: Metrics.base * 2,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        style={{ borderRadius: Metrics.radius, marginRight: Metrics.base * 3 }}
        width={50}
        src={thumb}
        alt='thumb'
      ></img>
      <div>
        <Typography>{label}</Typography>
      </div>
    </div>
  )
}

type OptionComponentProps = {
  props?: any
  selected?: any
  option?: any
}

export const OptionComponent: FC<OptionComponentProps> = ({
  props,
  selected,
  option
}) => {
  return (
    <li {...props} style={{ padding: 0 }}>
      <div
        style={{
          backgroundColor: selected ? baseColors.background : 'transparent',
          padding: '8px 16px',
          width: '100%'
        }}
      >
        <ListItem id={option.id} label={option.label} thumb={option.thumb} />
      </div>
    </li>
  )
}

interface PatronIdCardProps {
  patron: Patron
  expanded: boolean
  handleClose: Function
}

const getAlcoholLevelDescription = (alcoholLevel: number) => {
  if (alcoholLevel > 80) return 'FULL BENDER!'
  if (alcoholLevel > 60) return 'Wrecked'
  if (alcoholLevel > 40) return 'Drunk'
  if (alcoholLevel > 20) return 'Tipsy'
  if (alcoholLevel > 5) return 'Light Buzz'
  return 'Sober'
}
const maxAlcoholLevel = 100

const PatronIdCard: FC<PatronIdCardProps> = ({
  patron,
  expanded,
  handleClose
}) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink>()
  const [drinkInput, setDrinkInput] = useState('')
  const { data: cocktails, loading } = useDrinks()
  const [submitting, setSubmitting] = useState(false)
  const [addDrink] = useAddDrink()
  const [removePatron] = useRemovePatron()
  const alert = patron?.alcoholLevel > 60
  console.log('expanded', expanded)
  return (
    <div
      style={{
        background: baseColors.subsectionBackground,
        display: 'flex',
        flexDirection: 'column',
        padding: Metrics.base * 2,
        borderRadius: Metrics.radius,
        border: alert ? `2px solid ${baseColors.primary}` : 'none'
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: Metrics.base
        }}
      >
        <Heading>{patron?.name}</Heading>
        {expanded ? (
          <Button
            style={{}}
            onClick={() => {
              handleClose()
              typeof removePatron === 'function' &&
                removePatron({
                  variables: {
                    patronId: patron?.id
                  }
                })
            }}
          >
            <Typography color={baseColors.textSecondary}>
              <b>Remove Patron</b>
            </Typography>
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Subheading mb={4}>Weight: {patron?.weight}kg</Subheading>
      <Typography
        mb={1}
        color={alert ? baseColors.primary : baseColors.textSecondary}
      >
        Alcohol Level: <b>{getAlcoholLevelDescription(patron?.alcoholLevel)}</b>
      </Typography>
      <div
        style={{
          width: '100%',
          border: `1px solid ${baseColors.divider}`,
          background: '#18223255',
          borderRadius: Metrics.radius,
          height: 20
        }}
      >
        <div
          style={{
            width: `${(patron.alcoholLevel / maxAlcoholLevel) * 100}%`,
            height: '100%',
            background: gradient,
            borderRadius: Metrics.radius
          }}
        ></div>
      </div>
      {expanded && (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: Metrics.base * 4
            }}
          >
            <CustomAutocomplete
              freeSolo
              value={selectedDrink}
              onChange={(event, newValue) => {
                setSelectedDrink(newValue as Drink)
              }}
              inputValue={drinkInput}
              onInputChange={(event, newInputValue) => {
                setDrinkInput(newInputValue)
              }}
              disablePortal
              id='drinks-combo-box'
              options={cocktails}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label='Select Drink'
                  style={{ flex: 1 }}
                />
              )}
              ListboxProps={{
                style: {
                  padding: 0,
                  backgroundColor: baseColors.background,
                  color: baseColors.textPrimary
                }
              }}
              renderOption={(props, option, { selected }) => (
                <OptionComponent
                  props={props}
                  selected={selected}
                  option={option}
                />
              )}
            />
            <Button
              variant='contained'
              onClick={() => {
                if (selectedDrink) {
                  setSubmitting(true)
                  typeof addDrink === 'function' &&
                    addDrink({
                      variables: {
                        drinkId: selectedDrink.id,
                        patronId: patron?.id
                      }
                    })
                      .then(() => {
                        setSubmitting(false)
                      })
                      .catch(() => {
                        setSubmitting(false)
                      })
                }
              }}
              style={{
                marginLeft: Metrics.base * 2,
                width: 150,
                background: gradient
              }}
            >
              {submitting ? (
                <CircularProgress style={{ color: baseColors.background }} />
              ) : (
                <Typography color={baseColors.background}>
                  <b>Add Drink</b>
                </Typography>
              )}
            </Button>
          </div>
          <div style={{ width: '100%', maxHeight: 500, overflowY: 'scroll' }}>
            <Subheading mt={2} mb={3}>
              Drinks History:
            </Subheading>
            {patron?.drinks?.map((item, index) => (
              <DrinkCard
                key={item.drinkId + index}
                drinkId={item.drinkId}
                time={item.time}
                millilitersAlcohol={item.millilitersAlcohol}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PatronIdCard

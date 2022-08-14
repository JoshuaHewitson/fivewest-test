import { Button } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { Patron } from '../../containers'
import { Drink } from '../../graphql/queries/useDrink'
import { DrinkListItem, useDrinks } from '../../graphql/queries/useDrinks'
import { baseColors, gradient, Metrics } from '../../themes'
import DrinkCard from '../DrinkCard'
import CustomAutocomplete from '../styledMui/CustomAutocomplete'
import CustomTextField from '../styledMui/CustomTextField'
import Typography, { Display, Heading, Subheading } from '../Typography'

const ListItem: FC<DrinkListItem> = ({ label, thumb }) => {
  return (
    <div
      style={{
        marginBottom: Metrics.base * 2,
        display: 'flex',
        alignItems: 'center'
        // justifyContent: 'space-between'
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

export const OptionComponent = ({
  props,
  selected,
  option
}: OptionComponentProps) => {
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
}

const PatronIdCard: FC<PatronIdCardProps> = ({ patron, expanded }) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink>()
  const [drinkInput, setDrinkInput] = useState('')
  const { data: cocktails, loading } = useDrinks()
  const [drinksHistory, setDrinksHistory] = useState<Array<Drink>>([])

  return (
    <div
      style={{
        background: baseColors.subsectionBackground,
        display: 'flex',
        flexDirection: 'column',
        padding: Metrics.base * 2,
        borderRadius: Metrics.radius
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
        <Heading>{patron.name}</Heading>
        {expanded ? (
          <Button style={{}} onClick={() => {}}>
            <Typography color={baseColors.textSecondary}>
              <b>Remove Patron</b>
            </Typography>
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Subheading mb={4}>Weight: {patron.weight}kg</Subheading>
      <Typography mb={1} color={baseColors.textSecondary}>
        Alcohol Level: <b>Tipsy</b>
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
        <div style={{ width: 100, height: '100%', background: gradient }}></div>
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
              id='countries-combo-box'
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
              onClick={() =>
                selectedDrink &&
                setDrinksHistory([...drinksHistory, { ...selectedDrink }])
              }
              style={{
                marginLeft: Metrics.base * 2,
                background: gradient
              }}
            >
              <Typography color={baseColors.background}>
                <b>Add Drink</b>
              </Typography>
            </Button>
          </div>
          <Subheading mt={2} mb={3}>
            Drinks History:
          </Subheading>
          {drinksHistory.map((drink) => (
            <DrinkCard key={drink.id} drinkId={drink.id} />
          ))}
        </>
      )}
    </div>
  )
}

export default PatronIdCard

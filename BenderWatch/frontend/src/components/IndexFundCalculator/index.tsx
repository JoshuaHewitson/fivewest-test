import { Button } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { baseColors, gradient, Metrics } from '../../themes'
import CustomTextField from '../styledMui/CustomTextField'
import Typography, { Heading, Subheading } from '../Typography'

const initialTnput = [
  { ticker: 'BTC', mcap: 20000, price: 50 },
  { ticker: 'ETH', mcap: 10000, price: 25 },
  { ticker: 'LTC', mcap: 5000, price: 10 }
]

const getRatio = (mcap: number, input: any, start: number) => {
  let total = 0
  for (var i = start; i < input.length; i++) {
    total += input[i].mcap
  }
  return mcap / total
}

const balanceRemainingPercentage = (
  input: any,
  output: any,
  start: number,
  remainingPercentage: number
) => {
  for (var i = start; i < input.length; i++) {
    const ratio = getRatio(input[i].mcap, input, start)
    output[i].percentage += remainingPercentage * ratio
  }
  return output
}

const balanceEqually = (input: any, output: any) => {
  const percentage = 100 / input.length
  for (var i = 0; i < input.length; i++) {
    output[i].percentage = percentage
  }
  return output
}

const balanceRecursive = (
  input: any,
  output: any,
  assetCap: number,
  start: number,
  remainingPercentage: number
): any => {
  const ratio = getRatio(input[start].mcap, input, start)
  if (output[start].percentage + remainingPercentage * ratio < assetCap * 100) {
    return balanceRemainingPercentage(input, output, start, remainingPercentage)
  }
  remainingPercentage -= assetCap * 100 - output[start].percentage
  output[start].percentage = assetCap * 100
  for (var i = start + 1; i < input.length; i++) {
    if (start === input.length - 2) {
      output[i].percentage += remainingPercentage
      return output
    }
    const ratio = input[i].mcap / input[start].mcap
    output[i].percentage += output[start].percentage * ratio
    remainingPercentage -= output[i].percentage
  }
  return balanceRecursive(
    input,
    output,
    assetCap,
    start + 1,
    remainingPercentage
  )
}

const createCleanArrs = (original: any) => {
  const output = []
  const input = []
  let temp = [...original]
  temp.sort((a, b) => b.mcap - a.mcap)
  for (var i = 0; i < temp.length; i++) {
    const mcap = Number(temp[i].mcap)
    const price = Number(temp[i].price)
    output.push({
      ...temp[i],
      mcap: isNaN(mcap) ? 0 : mcap,
      price: isNaN(price) ? 0 : price,
      percentage: 0
    })
    input.push({
      ...temp[i],
      mcap: isNaN(mcap) ? 0 : mcap,
      price: isNaN(price) ? 0 : price
    })
  }
  return { input, output }
}

const getOutput = (original: any, assetCap: number, totalCapital: number) => {
  const { input, output } = createCleanArrs(original)
  if (assetCap * input.length < 1) {
    return balanceEqually(input, output)
  }
  return balanceRecursive(input, output, assetCap, 0, 100)
}

const RowContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        background: baseColors.subsectionBackground,
        padding: Metrics.base
      }}
    >
      {children}
    </div>
  )
}

const InputRow = ({
  inputItem,
  setInput,
  index
}: {
  inputItem: any
  setInput: Function
  index: number
}) => {
  return (
    <RowContainer>
      <CustomTextField
        style={{
          flex: 1,
          margin: Metrics.base
        }}
        value={inputItem.ticker}
        onChange={(e: any) => setInput(e.target.value, 'ticker')}
        label='Ticker'
        name={'ticker' + index}
      />
      <CustomTextField
        style={{
          flex: 1,
          margin: Metrics.base
        }}
        value={inputItem.mcap}
        onChange={(e: any) => setInput(e.target.value, 'mcap')}
        label='Market Cap'
        name={'mcap' + index}
      />
      <CustomTextField
        style={{
          flex: 1,
          margin: Metrics.base
        }}
        value={inputItem.price}
        onChange={(e: any) => setInput(e.target.value, 'price')}
        label='Price'
        name={'price' + index}
      />
    </RowContainer>
  )
}

const OutputRow = ({ outputItem }: { outputItem: any }) => {
  return (
    <RowContainer>
      <Typography>{outputItem.ticker}</Typography>
      <Typography>{outputItem.amount.toFixed(3)}</Typography>
      <Typography>{outputItem.usdValue.toFixed(3)}</Typography>
      <Typography>{outputItem.percentage.toFixed(3)}</Typography>
    </RowContainer>
  )
}

const IndexFundCalculator = ({ handleClose }: { handleClose: Function }) => {
  const [assetCap, setAssetCap] = useState(0.34)
  const [totalCapital, setTotalCapital] = useState(10000)
  const [input, setInput] = useState(initialTnput)
  const [output, setOutput] = useState([])
  useEffect(() => {
    const initialOutput = getOutput(
      input,
      Number(assetCap),
      Number(totalCapital)
    )
    setOutput(
      initialOutput.map((item: any) => {
        const usdValue = (item.percentage * totalCapital) / 100
        return {
          ...item,
          usdValue,
          amount: usdValue / item.price
        }
      })
    )
  }, [input, assetCap, totalCapital])
  return (
    <div
      style={{
        width: '100%',
        background: baseColors.background,
        padding: Metrics.base * 2
      }}
    >
      <Subheading mb={4}>Index Fund Calculator</Subheading>
      <CustomTextField
        style={{ width: '100%', marginBottom: Metrics.base * 2 }}
        value={assetCap}
        onChange={(e: any) => setAssetCap(e.target.value)}
        label='Asset Cap'
        name='assetCap'
      />
      <CustomTextField
        style={{ width: '100%', marginBottom: Metrics.base * 2 }}
        value={totalCapital}
        onChange={(e: any) => setTotalCapital(e.target.value)}
        label='Total Capital'
        name='totalCapital'
      />
      {input.map((inputItem, index) => (
        <InputRow
          key={'inputItem' + index}
          index={index}
          inputItem={inputItem}
          setInput={(value: any, key: string) => {
            let temp: any = [...input]
            temp[index][key] = value
            setInput([...temp])
          }}
        />
      ))}
      <div style={{ width: '100%', marginBottom: Metrics.base * 2 }}>
        <RowContainer>
          <Button
            variant='contained'
            onClick={() =>
              setInput([...input, { ticker: '', mcap: 5000, price: 10 }])
            }
            style={{
              background: gradient
            }}
          >
            ADD ROW
          </Button>
        </RowContainer>
      </div>
      {output.map((outputItem) => (
        <OutputRow outputItem={outputItem} />
      ))}
    </div>
  )
}
export default IndexFundCalculator

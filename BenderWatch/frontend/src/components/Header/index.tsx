import { Button, Dialog } from '@mui/material'
import { FC, useState } from 'react'
import { Patron } from '../../containers'
import { baseColors, gradient, Metrics } from '../../themes'
import AddPatronForm from '../AddPatronForm'
import Typography, { Display } from '../Typography'
import logo from '../../themes/images/BenderWatch_logo.svg'

interface HeaderProps {
  setPatrons: Function
  patrons: Array<Patron>
}

const Header: FC<HeaderProps> = ({ setPatrons, patrons }) => {
  const [addPatronOpen, setAddPatronOpen] = useState(false)
  return (
    <>
      <div
        style={{
          width: '100%',
          height: Metrics.headerHeight,
          borderBottom: `1px solid ${baseColors.divider}`,
          display: 'flex',
          padding: Metrics.base * 2,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <img src={logo} alt='logo' style={{ height: 60 }}></img>
        {/*<Display>BenderWatch</Display>*/}
        <Button
          variant='contained'
          onClick={() => setAddPatronOpen(true)}
          style={{
            background: gradient,
            height: Metrics.base * 6
          }}
        >
          <Typography color={baseColors.background}>
            <b>Add Patron</b>
          </Typography>
        </Button>
      </div>
      <Dialog
        onClose={() => setAddPatronOpen(false)}
        open={addPatronOpen}
        fullWidth={true}
        maxWidth='xs'
        PaperProps={{
          style: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <AddPatronForm
          handleClose={() => setAddPatronOpen(false)}
          setPatrons={setPatrons}
          patrons={patrons}
        />
      </Dialog>
    </>
  )
}

export default Header

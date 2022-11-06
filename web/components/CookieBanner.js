import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {useEffect} from 'react'

import {useTheme} from '@emotion/react'
import {Stack, useMediaQuery} from '@mui/material'
import {useState} from 'react'
import {getCookie, setCookie} from '../utils/cookieHelpers'

const ACCEPTED_COOKIES_NAME = 'acceptedCookies'

export default function CookieBanner() {
  // const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    setCookie(ACCEPTED_COOKIES_NAME, '1')
    setOpen(false)
  }

  useEffect(() => {
    const hasAccepted = getCookie(ACCEPTED_COOKIES_NAME) === '1'
    setOpen(!hasAccepted)
  }, [])

  return (
    <Modal
      BackdropProps={{opacity: 0}}
      disableScrollLock
      onBackdropClick={handleClose}
      open={open}
      onClose={handleClose}
      aria-labelledby="cookie-required-modal"
      aria-describedby="cookies-required-for-site-usage"
      disableAutoFocus
      disablePortal
      disableEnforceFocus
    >
      <Paper
        elevation={5}
        sx={[
          {
            p: 1.5,
            position: 'absolute',
            bottom: theme.spacing(2),
            left: theme.spacing(2),
          },
          isSm && {bottom: 0, left: 0, maxWidth: '100%'},
        ]}
      >
        <Stack direction={'row'} alignItems="center" gap={1}>
          <Typography variant="body2">
            This site uses cookies for essential functionality, analytics and seeing inside your
            brain.
          </Typography>

          <Button color="primary" onClick={handleClose} size="small">
            Okay
          </Button>
        </Stack>
      </Paper>
    </Modal>
  )
}

import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {Box} from '@mui/system'
import {Button, Container, Fade, TextField, Typography, useMediaQuery} from '@mui/material'
import {useTheme} from '@emotion/react'
import {setCookie} from '../utils/cookieHelpers'
const inputHeight = 60
const COOKIE_NAME = 'subscribedToNewsLetter'

export default function MailchimpInput(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {handleSumbitComplete = null, tags = []} = props

  const [value, setValue] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [fetching, setFetching] = useState(false)
  const [completed, setCompleted] = useState(false)

  const signUpUser = async (email, tags) => {
    if (email) {
      const res = await fetch('/api/mailing/subscribe', {
        body: JSON.stringify({
          email,
          subscribeToNewsletter: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const data = await res.json()

      const {error} = data

      if (error) {
        setFeedbackMessage(data.message)
      } else {
        tagUser(email, tags)
        setTimeout(() => {
          handleSumbitComplete && handleSumbitComplete()
        }, 2000)

        setCookie(COOKIE_NAME, '1')
        setCompleted(true)
      }
      setFetching(false)
    }
  }

  const tagUser = async (email, tags) => {
    const tagObject = tags.map(({tagName, tagStatus}) => ({name: tagName, status: tagStatus}))
    if (email && tags) {
      const addTags = await fetch('/api/mailing/update', {
        body: JSON.stringify({
          email,
          tags: tagObject,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const addTagsData = await addTags.json()
      const {error} = addTagsData

      if (error) {
        // Sentry log
      }
    }
  }

  const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/.test(email)
  }

  const onSubmit = () => {
    setFeedbackMessage('')
    setFetching(true)
    if (isValidEmail(value)) {
      signUpUser(value, tags)
    } else {
      setFetching(false)
      setFeedbackMessage("That email dosn't look right...")
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    setValue(val)
  }

  const completedMessage = (
    <Fade in={completed} timeout={1000}>
      <Box sx={{height: 125, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h6" align="center">
          Welcome to the Newsletter
        </Typography>
      </Box>
    </Fade>
  )

  const form = (
    <span>
      <Box
        sx={[
          {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            mt: 4,
          },
          isSm && {
            flexDirection: 'column',
            gap: 1,
          },
        ]}
      >
        <TextField
          name="email"
          id="emailInput"
          disabled={fetching}
          helperText={feedbackMessage}
          error={Boolean(feedbackMessage)}
          onChange={handleChange}
          value={value}
          variant="outlined"
          color="primary"
          placeholder="Join the newsletter"
          fullWidth
          InputProps={{
            sx: [
              {
                height: inputHeight,
                borderRadius: inputHeight / 2,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              isSm && {
                borderRadius: inputHeight / 2,
                px: 2,
              },
            ],
          }}
        />
        <Button
          fullWidth
          disableElevation
          disabled={fetching}
          onClick={onSubmit}
          variant="contained"
          color="primary"
          type="submit"
          sx={[
            {
              flexBasis: '30%',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: inputHeight,
              marginBottom: feedbackMessage ? 0 : '25px',
            },
            isSm && {
              borderRadius: inputHeight / 2,
              gap: 1,
            },
          ]}
        >
          {'Sign Up'}
        </Button>
      </Box>
    </span>
  )

  return completed ? completedMessage : form
}

MailchimpInput.propTypes = {
  tags: PropTypes.array,
  handleSumbitComplete: PropTypes.func,
}

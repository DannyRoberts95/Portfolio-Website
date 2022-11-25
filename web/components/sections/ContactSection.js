import {useTheme} from '@emotion/react'
import {Button, Grid, Stack, TextField, Typography, useMediaQuery} from '@mui/material'
import {useFormik} from 'formik'
import PropTypes from 'prop-types'
import {useState} from 'react'
import * as yup from 'yup'
import SectionContainer from '../SectionContainer'

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name silly...'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('How are we suppose to write back?'),
  message: yup.string('Write something?').required('Write something...'),
})
//
export default function ContactSection(props) {
  if (typeof window === undefined) return null

  const {sectionTitle, sections} = props

  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (values) => {
    setFeedback('Sending...')
    setIsSending(true)

    fetch(`/api/mailing/send-mail`, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (res) => {
        const data = await res.json()
        if (res.status == 200) {
          setFeedback(`Message sent. We'll be in touch`)
          setTimeout(() => {
            setOpen(false)
            formik.resetForm()
          }, 2500)
        } else {
          setFeedback(res.error)
        }
        setIsSending(false)
      })
      .catch((err) => {
        setIsSending(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, e) => handleSubmit(values),
  })

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  //'Not working, fix nodemailer in API ROUTE'
  return null

  return (
    <SectionContainer maxWidth={false}>
      {/* {sections.map((item) => ( */}
      <Grid
        container
        sx={{
          '>*': {
            borderLeft: `1px solid ${theme.palette.primary.main}`,
            borderRight: `1px solid ${theme.palette.primary.main}`,
          },
          '>:last-of-type': {
            borderRight: 'none',
          },
          '>:first-of-type': {
            borderLeft: 'none',
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{
            p: 2,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              formik.handleSubmit()
            }}
          >
            <Stack direction="column" spacing={4} mb={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject"
                variant="standard"
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Message"
                variant="standard"
                multiline
                rows={5}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Stack>
            <Typography variant="body2">{feedback}</Typography>

            {/* <Button onClick={handleClose}>Close</Button> */}
            <Button color="primary" variant="contained" type="submit" disabled={isSending}>
              Send
            </Button>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            p: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          ContactSection
          {/* {item.sectionText && <StyledBlockContent blocks={item.sectionText} />} */}
        </Grid>
      </Grid>
      {/* ))} */}
    </SectionContainer>
  )
}

ContactSection.propTypes = {
  sectionTitle: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
}

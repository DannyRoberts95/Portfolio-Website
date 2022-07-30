import {useTheme} from '@emotion/react'
import {Stack, Typography, useMediaQuery} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import {Box} from '@mui/system'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import client from '../client'
import useExitIntent from '../hooks/useExitIntent'
import {getCookie, setCookie} from '../utils/cookieHelpers'
import fireGtag from '../utils/fireGtag'
import MailchimpInput from './MailchimpInput'
import StyledBlockContent from './StyledBlockContent'

const EXIT_COOKIE_NAME = 'exitIntentModalShown'
const SUBSCRIBED_COOKIE_NAME = 'subscribedToNewsLetter'

const builder = imageUrlBuilder(client)

export default function ExitIntentModal(props) {
  const exitIntent = useExitIntent()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    image: {asset},
    header = null,
    textBlocks = null,
  } = props

  const dimensions = isSm ? {width: 400, height: 150} : {width: 300, height: 400}

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    window.scrollTo({top: 0})
  }

  const handleSumbitComplete = () => {
    handleClose(false)
    fireGtag('sign_up', {label: 'exit_intent_modal'})
  }

  useEffect(() => {
    const isSubscribed = getCookie(SUBSCRIBED_COOKIE_NAME) === '1'
    const hasShowRecently = getCookie(EXIT_COOKIE_NAME) === '1'
    if (exitIntent && !hasShowRecently && !isSubscribed && !open) {
      setOpen(true)
      //wait an hour before displaying this modal again
      let cookieExpiry = new Date()
      cookieExpiry = cookieExpiry.setHours(cookieExpiry.getHours() + 24 * 7)
      setCookie(EXIT_COOKIE_NAME, '1', cookieExpiry)
    }
  }, [exitIntent])

  if (!open) return null

  return (
    <Dialog id="exitIntentModal" open={open} onClose={handleClose} maxWidth="lg">
      <Stack flexDirection={isSm ? 'column-reverse ' : 'row'}>
        <Box sx={{p: 4, flexBasis: '50%'}}>
          {header && (
            <Typography variant="h4" gutterBottom noWrap={!isSm}>
              {header}
            </Typography>
          )}
          {textBlocks && <StyledBlockContent blocks={textBlocks} />}
          {<MailchimpInput handleSumbitComplete={handleSumbitComplete} />}
        </Box>
        <Box
          sx={[
            {position: 'relative', flexBasis: '50%'},
            isSm && {width: '100%', flexBasis: 'none'},
          ]}
        >
          <Image
            objectFit="cover"
            layout={isSm ? 'responsive' : 'fill'}
            placeholder="blur"
            width={dimensions?.width || null}
            height={dimensions?.height || null}
            quality={50}
            blurDataURL={builder.image(asset).width(dimensions.width).height(dimensions.height)}
            src={builder.image(asset).auto('format').url()}
            styles={{
              display: 'block',
              width: '100%',
              maxInlineSize: ' 100%',
              blockSize: 'auto',
            }}
            alt={'Before you go'}
          />
        </Box>
      </Stack>
    </Dialog>
  )
}

ExitIntentModal.propTypes = {
  image: PropTypes.object,
  textBlocks: PropTypes.arrayOf(PropTypes.object),
}

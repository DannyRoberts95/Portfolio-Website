import {useTheme} from '@emotion/react'
import {Box, Fade, Modal, Typography, useMediaQuery} from '@mui/material'
import Image from 'next/image'
import {useEffect} from 'react'
const LightBox = (props) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {open, src, caption, alt, handleClose = () => {}} = props

  const handleClick = () => {
    handleClose()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleClose, {once: true})
    return () => window.removeEventListener('scroll', handleClose)
  }, [open, handleClose])

  return (
    <Modal
      open={open}
      onClose={handleClick}
      closeAfterTransition
      disableScrollLock
      aria-labelledby={`lightbox-modal-picture-alt-${alt}`}
    >
      <Fade in={open}>
        <Box
          sx={{
            p: isSm ? 2 : 4,

            cursor: 'zoom-out',

            position: 'relative',
            height: '100vh',
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            onClick={handleClick}
            id="postHeroIllustration"
            layout="intrinsic"
            objectFit="contain"
            loading={'lazy'}
            quality={100}
            width={1920}
            height={(9 / 16) * 1920}
            alt={alt}
            src={src}
            blurDataURL={src}
          />

          {caption && (
            <Typography variant="body2" sx={{p: 2, color: '#fff'}}>
              {caption}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}
export default LightBox

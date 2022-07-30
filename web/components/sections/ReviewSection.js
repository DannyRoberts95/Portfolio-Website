import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  Rating,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {useTheme} from '@emotion/react'
import StyledBlockContent from '../StyledBlockContent'
import SectionContainer from '../SectionContainer'
import SectionTitle from '../SectionTitle'

const Review = ({review, ...others}) => {
  const [open, setOpen] = useState(false)
  const {body, reviewerName, reviewerType, rating} = review

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box component="span" {...others}>
      <Card
        sx={{
          flex: '0 0 auto',
          width: '380px',
          height: '350px',
          transition: 'all 0.25s',
        }}
        elevation={open ? 0 : 4}
      >
        <CardActionArea
          onClick={() => setOpen(true)}
          sx={{
            p: 2,
            positon: 'relative',
            overflow: 'hidden',
            height: '100%',
            '&::before': {
              content: "''",
              position: 'absolute',
              top: '50%',
              left: 0,
              backgroundImage:
                'linear-gradient(0deg, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Rating value={rating} color="primary.main" readOnly sx={{p: 1}} />
          <CardHeader title={reviewerName} subheader={reviewerType} />
          <CardContent sx={{positon: 'relative'}}>
            {body && <StyledBlockContent blocks={body} />}
          </CardContent>
        </CardActionArea>
      </Card>

      {/* REVIEW  DIALOG */}
      <Dialog onClose={handleClose} open={open}>
        <Card
          sx={{
            m: 2,
            flex: '0 0 auto',
            minWidth: '300px',
            maxWidth: '100%',
            transition: 'all 0.25s',
          }}
          elevation={0}
        >
          <Rating value={rating} color="primary.main" readOnly sx={{p: 2}} />
          <CardHeader title={reviewerName} subheader={reviewerType} />

          <CardContent sx={{maxWidth: '100%'}}>
            {body && <StyledBlockContent blocks={body} />}
          </CardContent>
          <CardActions>
            <Button varaint="text" color="primary" onClick={handleClose} sx={{ml: 'auto'}}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </Box>
  )
}

function ReviewSection(props) {
  const {sectionTitle, reviews} = props

  if (!reviews || !reviews.length) return null

  return (
    <SectionContainer maxWidth={false} disableGutters>
      <SectionTitle block={sectionTitle} />
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          p: 2,
          flexWrap: 'nowrap',
          overflowX: 'auto',
          webkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {reviews.map((review) => (
          <Review review={review} key={review._key} />
        ))}
      </Box>
    </SectionContainer>
  )
}

ReviewSection.propTypes = {
  sectionTitle: PropTypes.object,
  reviews: PropTypes.arrayOf(PropTypes.object),
}

export default ReviewSection

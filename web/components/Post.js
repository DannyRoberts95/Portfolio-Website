// [slug].js

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import PropTypes from 'prop-types'
import client from '../client'

import {useTheme} from '@emotion/react'
import TableOfContents from 'components/TableOfContents'

import PostBlockContent from 'components/PostBlockContent'
import ShareButton from 'components/ShareButton'

import {useEffect, useState} from 'react'
import formatDate from '../utils/helpers/formatDate'
import SectionContainer from './SectionContainer'
function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = (props) => {
  const {post, ...others} = props

  const {
    title = 'Missing title',
    author = null,
    publishedAt,
    categories,
    readTime,
    body = [],
    _id,
  } = post

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const [contentSections, setContentSections] = useState([])

  useEffect(() => {
    const postContainer = document.getElementById(_id)
    const headers = postContainer.getElementsByClassName('linked-header')
    setContentSections(headers)
  }, [])

  return (
    <Box id={_id} {...others}>
      <SectionContainer maxWidth={'xl'} sx={{p: 2, overflowX: 'hidden'}}>
        <Typography variant="h2" component="h1" sx={{my: 1}}>
          {title}
        </Typography>

        <Stack direction={'row'} gap={1} sx={{my: 2}}>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>

        <Stack direction={'row'} justifyContent="space-between" sx={{my: 1}}>
          <Stack direction="row" alignItems="center">
            <Box mr={2}>
              <Avatar
                variant="square"
                src={urlFor(author.image).format('webp').url()}
                sx={{width: 48, height: 48}}
              />
            </Box>
            <Stack>
              <Typography variant="body1">{author.name}</Typography>
              <Typography variant="caption">
                {formatDate(publishedAt)} {readTime && ` · ${readTime} min read`}
              </Typography>
            </Stack>
          </Stack>
          <ShareButton exposed={!isSm} />
        </Stack>
      </SectionContainer>

      <SectionContainer sx={{p: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TableOfContents
              header={title}
              elementList={contentSections}
              accordian={isSm}
              sx={{
                overflowY: 'scroll',
                position: 'sticky',
                top: `calc(${theme.shape.headerHeight}px + ${theme.spacing(1)})`,
                maxHeight: '80vh',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <PostBlockContent blocks={body} />
          </Grid>

          <Box display="flex" justifyContent={'center'} width="100%">
            <Button
              sx={{m: 4}}
              variant="outlined"
              size="large"
              onClick={() => scrollTo({top: 0, behavior: 'smooth'})}
            >
              Back to top
            </Button>
          </Box>
        </Grid>
      </SectionContainer>
    </Box>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  author: PropTypes.object,
  publishedAt: PropTypes.string,
  categories: PropTypes.array,
  body: PropTypes.array,
  readTime: PropTypes.number,
}

export default Post

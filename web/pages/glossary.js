import React from 'react'
import {Button, Container, Fade, Stack, Typography, useMediaQuery} from '@mui/material'
import Image from 'next/image'
import {Box} from '@mui/system'
import Link from 'components/CustomLink'
import Cta from 'components/Cta'
import {useTheme} from '@emotion/react'
import {NextSeo} from 'next-seo'

import Layout from 'components/layouts/Layout'

export default function Glossary(props) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const {config, navigation} = props

  if (!config || !navigation) return null

  return (
    <Layout config={config} navigation={navigation}>
      <p>GLOSSARY</p>
    </Layout>
  )
}

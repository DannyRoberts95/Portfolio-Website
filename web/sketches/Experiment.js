import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {Fade, Grow} from '@mui/material'

import logoImage from '../public/assets/404.png'
import client from 'client'
import imageUrlBuilder from '@sanity/image-url'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

//COMPONENT CODE
export default (props) => {
  const {paused, width, height} = props

  const windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  if (typeof window === undefined) return null

  let font1
  let radius = 200
  let img
  let tubeRadius = 100
  let textTexture
  let hu = 0
  let indexWord = 0
  let canvas
  let words = [
    'It is better to die of hunger having lived without grief and fear, than to live with a troubled spirit, amid abundance',
  ]

  const [posts, setPosts] = useState(null)
  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
          ...
        }`
      )
      .then((res) => setPosts(res))
  }, [])

  if (!posts) return 'WHOOOOOP'
  let thumbnails

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width || 0, height || 0).parent(canvasParentRef)
    p5.colorMode(p5.HSB, 360, 100, 100, 100)
    img = p5.loadImage('../apple-touch-icon.png')

    thumbnails = posts.map((post) =>
      p5.loadImage(urlFor(post.illustration.image).format('webp').url())
    )
    p5.background(255)

    thumbnails.forEach((tb) => p5.image(tb, p5.random(0, 1000), p5.random(0, 1000), 100, 100))
  }

  const draw = (p5) => {
    if (paused) return null
    // p5.image(thumbnail, p5.mouseX || 0, p5.mouseY || 0, 100, 100)
    // p5.background(255)
    // p5.orbitControl()
    // p5.box(400)
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

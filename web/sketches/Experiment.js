import dynamic from 'next/dynamic'

import {useTheme} from '@emotion/react'
import imageUrlBuilder from '@sanity/image-url'
import client from 'client'
import {useEffect, useState} from 'react'

function hexToRgb(hex) {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (normal) return normal.slice(1).map((e) => parseInt(e, 16))

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (shorthand) return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16))

  return null
}
function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

//COMPONENT CODE
export default (props) => {
  let {paused, width, height} = props

  let theme = useTheme()

  const [sanityData, setSanityData] = useState(null)

  useEffect(() => {
    // remove drafts
    const getPostByCategory = async (cat) => {
      const categoricalPosts = await client.fetch(
        `*[_type=="post"][0...3]{
        publishedAt,
        categories,
        summary,
        title,
        "categories": categories[]->title,
        illustration,
        slug,
      }
      `
      )
      console.log(categoricalPosts)
      setSanityData(categoricalPosts)
    }
    getPostByCategory()
  }, [])

  let windowResized = (p5, e) => {
    p5.resizeCanvas(width, height, true)
    p5.setup()
  }

  if (!sanityData) return 'Loading...'

  let projectImages = []

  let preload = (p5) => {}

  let setup = (p5, canvasParentRef) => {
    canvasParentRef && p5.createCanvas(width || 0, height || 0, p5.WEBGL).parent(canvasParentRef)

    projectImages = sanityData.map((item) => {
      const url = urlFor(item.illustration.image).url()
      return url
    })

    p5.background(255)
  }

  let draw = (p5) => {
    p5.background(255, 0, 0)

    console.log('projectImages', projectImages)
    // projectImages.forEach((i, img) => {
    //   console.log('img', img)
    //   p5.image(img, 0, 0, p5.width, p5.height)
    // })

    // p5.orbitControl()

    // p5.texture(projectImages[0])
    // p5.box(200, 200)
  }

  let mousePressed = (p5, canvasParentRef) => {
    // p5.clear()
  }

  // let keyPressed = (p5, canvasParentRef) => {
  //   p5.clear()
  // }

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseClicked={mousePressed}
    />
  )
}

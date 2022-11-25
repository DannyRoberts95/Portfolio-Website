import PropTypes from 'prop-types'
import {Fragment} from 'react'
import capitalizeString from '../utils/capitalizeString'
import * as SectionComponents from './sections'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[capitalizeString(section._type)]

  if (Section) {
    return Section
  }

  return null
}

function RenderSections(props) {
  const {sections} = props

  if (!sections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <Fragment>
      {sections.map((section, i) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return null
        }
        return <SectionComponent {...section} firstComponent={i === 0} key={section._key} />
      })}
    </Fragment>
  )
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object),
}

export default RenderSections

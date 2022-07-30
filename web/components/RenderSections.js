import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import * as SectionComponents from './sections'
import capitalizeString from '../utils/capitalizeString'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[capitalizeString(section._type)]

  if (Section) {
    return Section
  }

  console.log('Cant find section', section) // eslint-disable-line no-console
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

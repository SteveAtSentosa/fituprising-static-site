import PT from 'prop-types'
import { makeProps, applyProps, ce } from '../utils/render'
import { InfoBox, InfoListEntry } from '../components/info-box'


//*****************************************************************************
// Interface
//*****************************************************************************

const sectionShape = PT.arrayOf(PT.shape({
  title: PT.string.isRequired,
  path: PT.string.isRequired,
}))

const propSpecs = makeProps([
  [ 'sections', sectionShape, [] ], // list of articles to display
])

//*****************************************************************************
// Component
//*****************************************************************************

const TocComponent = applyProps(({ sections, className }) =>
  InfoBox({ className }, sections.map((section, key) =>
    InfoListEntry({ key, linkTo: section.path }, section.title))), propSpecs)

export default TocComponent
export const Toc = (...args) => ce(TocComponent, ...args)


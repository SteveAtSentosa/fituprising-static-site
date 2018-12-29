import PT from 'prop-types'
import { makeStyles, s } from '../utils/style'
import { makeProps, applyProps, ce, Div, Link } from '../utils/render'


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

const TocComponent = applyProps(({ sections, className }) => {

  const style = makeStyles({
    root: [ tw`bg-grey-200 rounded-lg px-4 py-4`, className ],
    label: tw`pb-2 text-grey-600 text-sm font-bold`,
    title: [ tw`font-mont text-fu-purple md:text-sm`, s['no-underline'] ],
  })

  return (
    Div(style('root'), [
      sections.map((section, key) =>
        Div({ key }, Link({ ...style('title'), to: section.path }, section.title))
      )
    ])
  )
}, propSpecs)

export default TocComponent
export const Toc = (...args) => ce(TocComponent, ...args)


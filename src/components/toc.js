import PT from 'prop-types'
import { makePropSpec, componentify, Div } from '../utils/render'
import { InfoBox, InfoListEntry } from '../components/info-box'
import { makeStyles, css } from '../utils/style'


//*****************************************************************************
// Interface
//*****************************************************************************

const sectionShape = PT.arrayOf(PT.shape({
  title: PT.string.isRequired,
  path: PT.string.isRequired,
}))

const propSpec = makePropSpec([
  [ 'sections', sectionShape, [] ], // list of sections to display
  [ 'activeSectionPath', PT.string, '' ], // active chapter path
  [ 'leadingNote', PT.string, '' ], // add a note at the top of the toc
  [ 'trailingNote', PT.string, '' ], // add a note at the bottom of the toc
])

//*****************************************************************************
// Component
//*****************************************************************************

const TocComponent = props => {

  const { sections, activeSectionPath, leadingNote, trailingNote, className } = props

  const style = makeStyles({
    root: className,
    label: tw`text-sm font-treb font-semibold`,
    leadingNote: tw`text-sm leading-tight pb-2 md:pb-1 text-grey-400 `,
    trailingNote: tw`text-sm leading-tight pt-4 md:pt-2 text-grey-400`,
  })

  const sectionIsActive = section => section.path === activeSectionPath

  return Div(style('root'),
    Div(style('label'), 'Table Of Contents'),
    InfoBox(0, [
      leadingNote && InfoListEntry({ ...style('leadingNote'), key: 'leadingNote' }, leadingNote),
      sections.map((section, key) => InfoListEntry({
        key,
        ...css(sectionIsActive(section) && [ tw`text-black`, '$no-underline' ]),
        linkTo: section.path
      },
      section.title)),
      trailingNote && InfoListEntry({ ...style('trailingNote'), key: 'trailingNote' }, trailingNote),
    ])
  )
}

export const Toc = componentify(TocComponent, propSpec)

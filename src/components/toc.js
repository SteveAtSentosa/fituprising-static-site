import PT from 'prop-types'
import { isNil } from 'ramda'
import { makePropSpec, componentify, Div } from '../utils/render'
import { InfoBox, InfoListEntry } from '../components/info-box'
import { makeStyles, css } from '../utils/style'


//*****************************************************************************
// Interface
//*****************************************************************************

const entryShape = PT.arrayOf(PT.shape({
  title: PT.string.isRequired,
  path: PT.string // if provided, toc entry will be a link to this path
}))

const propSpec = makePropSpec([
  [ 'sections', entryShape, [] ], // list of sections to display
  [ 'activeSectionPath', PT.string ], // active section path
  [ 'activeSectionIdx', PT.number ], // active section index
  [ 'onEntryClick', PT.func ], // if entry clicked, calls onClick({idx, path})
  [ 'leadingNote', PT.string, '' ], // add a note at the top of the toc
  [ 'trailingNote', PT.string, '' ], // add a note at the bottom of the toc
])

//*****************************************************************************
// Component
//*****************************************************************************

const TocComponent = props => {

  const { leadingNote, trailingNote, className } = props
  const { sections, activeSectionPath, activeSectionIdx, onEntryClick } = props

  const style = makeStyles({
    root: className,
    label: tw`text-sm font-treb font-semibold`,
    // sectionTitle: [ tw`py-1 md:py-0 hover:underline`, isActive => tw`hover:no-underline text-black` ],
    leadingNote: tw`text-sm leading-tight pb-2 md:pb-1 text-grey-400 `,
    trailingNote: tw`text-sm leading-tight pt-4 md:pt-2 text-grey-400`,
  })

  const sectionIsActive = (section, idx) =>
    (!isNil(activeSectionIdx) && idx === activeSectionIdx) ||
    (!isNil(activeSectionPath) && section.path === activeSectionPath)

  return Div(style('root'),
    Div(style('label'), 'Table Of Contents'),
    InfoBox(0, [
      leadingNote && InfoListEntry({ ...style('leadingNote'), key: 'leadingNote' }, leadingNote),

      sections.map((section, idx) => InfoListEntry({
        key: idx,
        onClick: () => onEntryClick({ idx, path: section.path }),
        linkTo: section.path,
        // ...style('sectionTitle', sectionIsActive(section, idx))
        ...css([
          tw`py-1 md:py-0 hover:underline cursor-pointer`,
          sectionIsActive(section, idx) && tw`hover:no-underline text-black cursor-default`
        ])
      },
      section.title)),

      trailingNote && InfoListEntry({ ...style('trailingNote'), key: 'trailingNote' }, trailingNote),
    ])
  )
}

export const Toc = componentify(TocComponent, propSpec)

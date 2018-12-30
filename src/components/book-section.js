import PT from 'prop-types'
import { makeStyles } from '../utils/style'
import { Div, makePropSpec, innerHtml, componentify } from '../utils/render'
import { SectionTitle } from '../components/section-title'
import { Html } from '../components/html'
import { ScrollerAutoTop } from '../components/scroller-auto-top'


//*****************************************************************************
// Interface
//*****************************************************************************

const propSpec = makePropSpec([
  [ 'height', PT.number, 600 ],
  [ 'title', PT.string, '' ],
  [ 'html', PT.string, '' ]
])

//*****************************************************************************
// Component
//*****************************************************************************

const BookSectionComponent = ({ height, title, html }) => {

  const style = makeStyles({
    text: tw`p-4`,
    scroller: '$border'
  })

  return (
    Div(style('root'),
      SectionTitle(0, title),
      ScrollerAutoTop({ ...style('scroller'), height },
        Html({ ...style('text') }, html)
      )
    )
  )
}

export const BookSection = componentify(BookSectionComponent, propSpec)


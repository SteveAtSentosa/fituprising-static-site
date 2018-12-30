import PT from 'prop-types'
import { ce, makePropSpec, componentify, Div, Span, Image } from '../utils/render'
import { makeStyles } from '../utils/style'


//*****************************************************************************
// Interface
//*****************************************************************************

const propSpec = makePropSpec([
  [ 'image', PT.object, {} ], // image info from gatsby sharp image query
  [ 'date', PT.string, '' ], // date that the photo was taken
  [ 'label', PT.string, '' ], // label for the photo
  [ 'subLabel', PT.string, '' ], // label for the photo
  [ 'className', PT.string, '' ], // css class to apply to the root

])

//*****************************************************************************
// Component
//*****************************************************************************

const PhotoComponent = ({ image, label, subLabel, date, className }) => {

  const style = makeStyles({
    root: className,
    header: tw`font-mont flex justify-between items-end`,
    frame: tw`flex shadow-lg`,
    image: tw`m-3 rounded-lg`,
  })

  return (
    Div(style('root'),
      Div(style('header'),
        Label({ label, subLabel }),
        DateStamp({ date })),
      Div(style('frame'), Image({ ...style('image'), ...image }))
    )
  )
}

export const Photo = componentify(PhotoComponent, propSpec)

//*****************************************************************************
// Helpers
//*****************************************************************************


function Label(...args) { return ce(LabelComponent, ...args) }
function LabelComponent({ label, subLabel, className }) {

  const style = makeStyles({
    root: [ tw`-mb-1 pl-1 text-grey-600 flex items-end`, className ],
    label: tw`mr-1 text-base`,
    subLabel: tw`mb-1 text-2xs`,
  })

  return (
    Div(style('root'),
      Div(style('label'), label),
      Div(style('subLabel'), subLabel),
    )
  )
}

function DateStamp(...args) { return ce(DateStampComponent, ...args) }
function DateStampComponent({ date, className }) {

  const style = makeStyles({
    root: [ tw`pr-1 flex text-grey-400 text-xs md:text-2xs`, className ],
  })

  return (
    Div(style('root'), date)
  )
}



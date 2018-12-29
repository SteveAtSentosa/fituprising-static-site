import PT from 'prop-types'
import { css, s } from '../utils/style'
import { ce, Div, Link } from '../utils/render'


const InfoBoxCompoent = ({ children, className }) =>
  Div(css([ '$info-box-container', className ]), children)

export const InfoBox = (...args) => ce(InfoBoxCompoent, ...args)

const InfoListEntryComponent = ({ linkTo, children, className }) => linkTo ?
  Div(0, Link({ ...css(['$info-box-list-entry', className]), to: linkTo }, children)) :
  Div(css([ '$info-box-list-entry', className ]), children)

export const InfoListEntry = (...args) => ce(InfoListEntryComponent, ...args)

const InfoParagraphComponent = ({ last = true, children, className }) =>
  Div(css([ '$info-box-paragraph', last && tw`pb-0`, className ]), children)

export const InfoParagraph = (...args) => ce(InfoParagraphComponent, ...args)

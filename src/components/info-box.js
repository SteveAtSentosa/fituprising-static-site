import { css } from '../utils/style'
import { componentify, Div, Link } from '../utils/render'

export const InfoBox = componentify(({ children, className }) =>
  Div(css([ '$info-box-container', className ]), children)
)

export const InfoListEntry = componentify(({ linkTo, children, className }) => linkTo ?
  Div(0, Link({ ...css(['$info-box-list-entry', className]), to: linkTo }, children)) :
  Div(css([ '$info-box-list-entry', className ]), children)
)

export const InfoParagraph = componentify(({ last = true, children, className }) =>
  Div(css([ '$info-box-paragraph', last && tw`pb-0`, className ]), children)
)

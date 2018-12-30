import { noop } from 'ramda-adjunct'
import { css } from '../utils/style'
import { componentify, Div, Link } from '../utils/render'

export const InfoBox = componentify(({ children, className }) =>
  Div(css([ '$info-box-container', className ]), children)
)

const InfoListEntryComponent = props => {
  const { linkTo, onClick, children, className } = props
  const safeClick = onClick || noop
  return linkTo ?
    Div(0, Link({ ...css(['$info-box-list-entry', className]), to: linkTo }, children)) :
    Div({ ...css([ '$info-box-list-entry', className ]), onClick: safeClick }, children)
}
export const InfoListEntry = componentify(InfoListEntryComponent)

// export const InfoListEntry = componentify(({ linkTo, onClick, children, className }) => linkTo ?
//   Div(0, Link({ ...css(['$info-box-list-entry', className]), to: linkTo }, children)) :
//   Div({ ...css([ '$info-box-list-entry', className ], onClick) }, children)
// )

export const InfoParagraph = componentify(({ last = true, children, className }) =>
  Div(css([ '$info-box-paragraph', last && tw`pb-0`, className ]), children)
)

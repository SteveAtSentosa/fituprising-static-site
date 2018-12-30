import { componentify, Div, innerHtml } from '../utils/render'

// supply html string as child
const HtmlComponent = ({ html, children, className }) =>
  Div({ className, ...innerHtml(children) })

export const Html = componentify(HtmlComponent)



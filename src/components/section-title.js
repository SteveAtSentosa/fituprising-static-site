import { ce, Div } from '../utils/render'
import { s } from '../utils/style'

const SectionTitleComponent = ({ children, className }) =>
  Div({ css: [ s['section-title'], className ] }, children)

export default SectionTitleComponent
export const SectionTitle = (...args) => ce(SectionTitleComponent, ...args)

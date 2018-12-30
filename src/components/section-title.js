import { componentify, Div } from '../utils/render'
import { s } from '../utils/style'

const SectionTitleComponent = ({ children, className }) =>
  Div({ css: [ s['section-title'], className ] }, children)

export const SectionTitle = componentify(SectionTitleComponent)

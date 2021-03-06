import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { jsx, Global } from '@emotion/core'


// allows you to use `css` in place of `className`
export const ce = jsx

// simplify addition of react proptypes and defaults to a component
// propSpec = [ propName, propType, defaultValue]

const addPropSpec = (toThisSpec, propName, propType, propDefault) => ({
  propTypes: { ...(toThisSpec.propTypes || {}), [propName]: propType },
  defaultProps: { ...(toThisSpec.defaultProps || {}), [propName]: propDefault },
})

export const makePropSpec = propSpec =>
  propSpec.reduce((acc, propSpec) => addPropSpec(acc, ...propSpec), {})

export const applyProps = (component, propSpec) => {
  component.propTypes = propSpec.propTypes
  component.defaultProps = propSpec.defaultProps
  return component
}
export const componentify = (component, propSpec) => {
  const toRender = propSpec ? applyProps(component, propSpec) : component
  return (...args) => ce(toRender, ...args)
}

export const Div = (...args) => ce('div', ...args)
export const Span = (...args) => ce('span', ...args)
export const P = (...args) => ce('p', ...args)
export const Strong = (...args) => ce('strong', ...args)

export const Link = (...args) => ce(GatsbyLink, ...args)
export const Image = (...args) => ce(GatsbyImage, ...args)
export const GlobalStyles = (...args) => ce(Global, ...args)


// create inner HTML render property
export const innerHtml = html => ({ dangerouslySetInnerHTML: { __html: html } })

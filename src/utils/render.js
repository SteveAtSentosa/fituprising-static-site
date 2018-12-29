import { jsx } from '@emotion/core'
import { Link as GatsbyLink } from 'gatsby'
import { Global } from '@emotion/core'
import GatsbyImage from 'gatsby-image'


// allows you to use `css` in place of `className`
export const ce = jsx

// simplify addition of react proptypes and defaults to a component
// propSpec = [ propName, propType, defaultValue]

const addComponentPropSpec = (toThisSpec, propName, propType, propDefault) => ({
  propTypes: { ...(toThisSpec.propTypes || {}), [propName]: propType },
  defaultProps: { ...(toThisSpec.defaultProps || {}), [propName]: propDefault },
});

export const makeProps = propSpecs =>
  propSpecs.reduce((acc, propSpec) => addComponentPropSpec(acc, ...propSpec), {})

export const applyProps = (component, propSpecs) => {
  component.propTypes = propSpecs.propTypes
  component.defaultProps = propSpecs.defaultProps
  return component
}

export const Div = (...args) => ce('div', ...args)
export const Span = (...args) => ce('span', ...args)
export const P = (...args) => ce('p', ...args)
export const Strong = (...args) => ce('strong', ...args)

export const Link = (...args) => ce(GatsbyLink, ...args)
export const Image = (...args) => ce(GatsbyImage, ...args)
export const GlobalStyles = (...args) => ce(Global, ...args)

export const Componentify = (component, ...rest) => ce(component, ...rest)

// create inner HTML render property
export const innerHtml = html => ({ dangerouslySetInnerHTML: { __html: html } })


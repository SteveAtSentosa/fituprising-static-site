import { jsx } from '@emotion/core'

// allows you to use `css` in place of `className`
export const ce = jsx

// simplify add react proptypes and defaults to a component
// propSpec = [ propName, propType, defaultValue]

const addComponentPropSpec = (toThisSpec, propName, propType, propDefault) => ({
  propTypes: { ...(toThisSpec.propTypes||{}), [propName]: propType },
  defaultProps: { ...(toThisSpec.defaultProps||{}), [propName]: propDefault },
});

export const makePropSpecs = propSpecs =>
  propSpecs.reduce((acc, propSpec) => addComponentPropSpec(acc, ...propSpec), {});

export const applyPropSpecs = (component, propSpecs) => {
  component.propTypes = propSpecs.propTypes;
  component.defaultProps = propSpecs.defaultProps;
  return component;
}

// create inner HTML render property
export const innerHtml = html => ({ dangerouslySetInnerHTML: { __html: html }});

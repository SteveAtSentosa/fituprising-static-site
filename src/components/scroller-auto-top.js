import React from 'react'
import PT from 'prop-types'
import { Div, makePropSpec, componentify } from '../utils/render'

//*****************************************************************************
// Interface
//*****************************************************************************

const propSpec = makePropSpec([
  ['height', PT.number, '100%'],
  ['className', PT.string, '']
])

//*****************************************************************************
// Component
//*****************************************************************************

class ScrollerAutoTopComponent extends React.Component {

  componentDidUpdate() {
    this._div.scrollTop = 0
  }

  render() {
    const { height, className } = this.props
    return (
      Div({
        className,
        style: { height, overflowY: 'scroll' },
        ref: ref => (this._div = ref)
      },
      this.props.children)
    )
  }
}

export const ScrollerAutoTop = componentify(ScrollerAutoTopComponent, propSpec)


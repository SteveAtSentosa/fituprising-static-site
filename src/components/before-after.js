import React from 'react'
import { path, curry } from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import { componentify, Div, Image } from '../utils/render'
import { makeStyles } from '../utils/style'
import { Photo } from '../components/photo'


//*****************************************************************************
// Component
//*****************************************************************************

const render = curry((props, data) => {

  const { className } = props
  const { before, after } = data

  const style = makeStyles({
    root: [ tw`flex`, className ],
    image: tw`mt-3 mb-8 mr-4 md:mr-16`
  })

  return (
    Div(style('root'),
      Photo({
        ...style('image'),
        image: before.childImageSharp,
        date: 'August 2013',
        label: '315',
        subLabel: 'LBS'
      }),
      Photo({
        ...style('image'),
        image: after.childImageSharp,
        date: 'July 2018',
        label: '248',
        subLabel: 'LBS'
      })
    )
  )
})

const BeforeAfterComponent = props => <StaticQuery query={query} render={render(props)} />
export const BeforeAfter = componentify(BeforeAfterComponent)


//*****************************************************************************
// Query
//*****************************************************************************

const query = graphql`
  query BeforeAfterQuery {
    before: file(relativePath: { eq: "assets/before.jpg" }) {
      childImageSharp {
        fixed(height: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    after: file(relativePath: { eq: "assets/after.jpg" }) {
      childImageSharp {
        fixed(height: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

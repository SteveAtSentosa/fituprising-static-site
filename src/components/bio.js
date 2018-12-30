import React from 'react'
import PT from 'prop-types'
import { curry, path } from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import { makeStyles } from '../utils/style'
import { componentify, makePropSpec, Div, P, Strong, Image } from '../utils/render'

//*****************************************************************************
// Interface
//*****************************************************************************

// TODO: defult props not being applied as I expect ... figure thes one out at some point
const propSpec = makePropSpec([
  [ 'headshot', PT.bool, true ], // show the head shot?
])

//*****************************************************************************
// Component
//*****************************************************************************


const render = curry((props, data) => {

  const headShotPhoto = path(['headshot', 'childImageSharp'], data)
  const { headshot } = props
  const style = makeStyles({
    root: tw`flex mb-4 mt-4 md:mt-6`,
    headshot: [ tw`mr-4 mb-0 mt-2 md:mt-1 rounded-full`, { minWidth: 75 } ],
    blurb: tw`mb-0 text-base`,
  })

  return Div(style('root'),
    headshot && Image({ ...style('headshot'), ...headShotPhoto }),
    P(style('blurb'),
      `My name is `, Strong(0, 'Steve Saunders. '),
      `I've been thinking about and applying the psychology of weight loss for years.
       I'm hoping that I can share some of the things that I have learned.`
    )
  )
})

const BioComponent = props => <StaticQuery query={query} render={render(props)} />
export const Bio = componentify(BioComponent, propSpec)

//*****************************************************************************
// Query
//*****************************************************************************

const query = graphql`
  query BioQuery {
    headshot: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

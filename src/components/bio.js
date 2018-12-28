import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Image from 'gatsby-image'
import { makeStyles } from '../utils/style'
import { ce, Div, P, Strong, Image } from '../utils/render'

const BioComponent = () => <StaticQuery query={query} render={render} />

export default BioComponent
export const Bio = (...args) => ce(BioComponent, ...args)

//*****************************************************************************
// Component
//*****************************************************************************


function render(data) {

  const style = makeStyles({
    root: tw`flex mb-4 mt-10 md:mt-6`,
    image: [ tw`mr-4 mb-0 mt-2 md:mt-1 rounded-full`, { minWidth: 75 } ],
    blurb: tw`text-base`,
  })

  const { author } = data.site.siteMetadata
  const fixed = data.avatar.childImageSharp.fixed

  return Div(style('root'),
    Image({ ...style('image'), fixed, alt: author }),
    P(style('blurb'),
      `Greetings.  My name is `, Strong(0, 'Steve Saunders. '),
      `I've been thinking about and applying the psychology of weight loss for years.
       These writings capture some of those thoughts.`
    )
  )
}

//*****************************************************************************
// Query
//*****************************************************************************

const query = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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

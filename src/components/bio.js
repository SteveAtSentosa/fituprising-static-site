import React from 'react'
import { curry, path } from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import { makeStyles } from '../utils/style'
import { componentify, Div, P, Strong, Image } from '../utils/render'

//*****************************************************************************
// Component
//*****************************************************************************


const render = curry((props, data) => {

  console.log('data: ', data)
  const { headShot } = props

  const headShotPhoto = path(['headShot', 'childImageSharp'], data)

  const style = makeStyles({
    root: tw`flex mb-4 mt-4 md:mt-6`,
    headShot: [ tw`mr-4 mb-0 mt-2 md:mt-1 rounded-full`, { minWidth: 75 } ],
    blurb: tw`mb-0 text-base`,
  })

  return Div(style('root'),
    headShot && Image({ ...style('headShot'), ...headShotPhoto }),
    P(style('blurb'),
      `My name is `, Strong(0, 'Steve Saunders. '),
      `I've been thinking about and applying the psychology of weight loss for years.
       I'm hoping that I can share some of the things that I have learned.`
    )
  )
})

// const BioComponent = () => <StaticQuery query={query} render={render} />
// export const Bio = componentify(BioComponent)

const BioComponent = props => <StaticQuery query={query} render={render(props)} />
export const Bio = componentify(BioComponent)


//*****************************************************************************
// Query
//*****************************************************************************

const query = graphql`
  query BioQuery {
    headShot: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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

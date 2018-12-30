import { graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { Layout } from '../components/layout'
import { Posts } from '../components/posts'
import { Bio } from '../components/bio'
import { BeforeAfter } from '../components/before-after'
import { SectionTitle } from '../components/section-title'
import { InfoBox, InfoParagraph } from '../components/info-box'
import { makeStyles, css } from '../utils/style'


//*****************************************************************************
// Component
//*****************************************************************************

const Index = ({ data, location }) => {

  const edges = pathOr([], [ 'allMarkdownRemark', 'edges' ], data)
  const articles = edges.map(({ node }) => ({
    title: pathOr('', ['frontmatter', 'title'], node),
    date: pathOr('', ['frontmatter', 'date'], node),
    summary: pathOr('', ['frontmatter', 'summary'], node),
    path: pathOr('', ['fields', 'slug'], node),
  }))

  const style = makeStyles({
    beforeAfter: tw`mb-12`,
    blurb: tw`mt-12`,
  })


  return (
    Layout({ location, title: 'Be Different' },
      Bio(),
      InfoBox(style('blurb'), InfoParagraph(0, `
        Weight loss is hard.  We all know what to do, eat less, move more.
        So, why are so many of us overweight? I believe that it is all about what is happening in the mind.
        It’s a tough problem, I hope that you will join me as I work on solving it.`)),
      BeforeAfter(style('beforeAfter')),
      SectionTitle(0, 'Most Recent Blog Posts'),
      Posts({ articles })
    ))
}

export default Index

//*****************************************************************************
// Queries
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/blog/"}}
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 5
  ) {
    edges {
      node {
        frontmatter {
          title
          date
          summary
        }
        fields {
          slug
        }
      }
    }
  }
}`


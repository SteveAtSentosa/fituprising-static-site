import { graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { Layout } from '../components/layout'
import { Posts } from '../components/posts'
import { Bio } from '../components/bio'
import { SectionTitle } from '../components/section-title'
import { InfoBox, InfoParagraph } from '../components/info-box'
import { css } from '../utils/style'


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

  return (
    Layout({ location, title: 'Be Different' },
      Bio(),
      InfoBox(css(tw`mb-8`), InfoParagraph(0, `
        Weight loss is hard, very hard.  We all know what to do, right? Eat less, move more.
        So, what's the problem? I believe that it is all about what is happening in the mind.
        It’s a tough problem, I hope that you will join me  I try to solve it.`)),
      SectionTitle(0, 'Most Recent Blg Posts'),
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


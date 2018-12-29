import { graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { Layout } from '../components/layout'
import { Posts } from '../components/posts'

//*****************************************************************************
// Component
//*****************************************************************************

const Blog = ({ data, location }) => {

  const edges = pathOr([], [ 'allMarkdownRemark', 'edges' ], data)
  const articles = edges.map(({ node }) => ({
    title: pathOr('', ['frontmatter', 'title'], node),
    date: pathOr('', ['frontmatter', 'date'], node),
    summary: pathOr('', ['frontmatter', 'summary'], node),
    path: pathOr('', ['fields', 'slug'], node),
  }))

  return (
    Layout({ location, title: 'The Blog' },
      Posts({ articles })
    ))
}

export default Blog

//*****************************************************************************
// Queries
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/blog/"}}
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 1000
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


import { graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { Layout } from '../components/layout'
import { Toc } from '../components/book-toc'

//*****************************************************************************
// Component
//*****************************************************************************

const BookComponent = ({ data, location }) => {

  const edges = pathOr([], [ 'allMarkdownRemark', 'edges' ], data)
  const sections = edges.map(({ node }) => ({
    title: pathOr('', ['frontmatter', 'title'], node),
    path: pathOr('', ['fields', 'slug'], node),
  }))

  return (
    Layout({ location, title: 'The Book' },
      Toc({ sections })
    ))
}

export default BookComponent

//*****************************************************************************
// Query
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/book/"}}
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

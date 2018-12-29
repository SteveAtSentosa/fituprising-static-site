import { graphql } from 'gatsby'
import { propOr } from 'ramda'
import { Div, innerHtml } from '../utils/render'
import { makeStyles, s } from '../utils/style'
import { Layout } from '../components/layout'
import { Toc } from '../components/book-toc'
import { SectionTitle } from '../components/section-title'

//*****************************************************************************
// Component
//*****************************************************************************

const BookSection = ({ location, data, pageContext }) => {
  const sections = propOr([], 'sections', pageContext)
  const fallback = { html: '<p>Hmmm, something went wrong... </p>', frontmatter: {} }
  const bookSection = propOr(fallback, 'markdownRemark', data)
  const style = makeStyles({
    root: tw`mt-8 md:mt-16`,
  })

  return (
    Layout({ location, title: 'The Book' },
      Toc({ sections }),
      Div(style('root'),
        SectionTitle(0, bookSection.frontmatter.title),
        Div(innerHtml(bookSection.html))
      )
    ))
}

export default BookSection

//*****************************************************************************
// Query
//*****************************************************************************

export const pageQuery = graphql`
  query BookSectionQuery( $slug: String!) {
    markdownRemark (fields: { slug: { eq:$slug }}) {
      html
      frontmatter {
        title
        date
        summary
      }
    }
  }
`
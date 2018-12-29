import { graphql } from 'gatsby'
import { propOr } from 'ramda'
import { Div, innerHtml } from '../utils/render'
import { makeStyles } from '../utils/style'
import { Layout } from '../components/layout'
import { Toc } from '../components/book-toc'

//*****************************************************************************
// Component
//*****************************************************************************

const BookSection = ({ location, data, pageContext }) => {
  const sections = propOr([], 'sections', pageContext)
  const fallback = { html: '<p>Hmmm, something went wrong... </p>', frontmatter: {} }
  const bookSection = propOr(fallback, 'markdownRemark', data)
  const style = makeStyles({
    root: tw`mt-8 md:mt-16`,
    toc: tw`mt-6 md:-mt-4 md:-mb-6`,
    title: tw`mb-8 text-2xl leading-tight font-semibold text-black`,
  })

  return (
    Layout({ location, title: 'The Book' },
      Toc({ ...style('toc'), sections }),
      Div(style('root'),
        Div(style('title'), bookSection.frontmatter.title),
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

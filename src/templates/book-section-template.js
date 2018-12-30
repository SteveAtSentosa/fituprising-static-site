import { graphql } from 'gatsby'
import { propOr, pathOr } from 'ramda'
import { Div, innerHtml } from '../utils/render'
import { makeStyles, css } from '../utils/style'
import { Layout } from '../components/layout'
import { Toc } from '../components/toc'
import { SectionTitle } from '../components/section-title'

//*****************************************************************************
// Component
//*****************************************************************************

const BookSection = ({ location, data, pageContext }) => {

  const sections = propOr([], 'sections', pageContext)
  const fallback = { html: '<p>Hmmm, something went wrong... </p>', frontmatter: {} }
  const activeSection = propOr(fallback, 'markdownRemark', data)
  const activeSectionPath = pathOr('', ['fields', 'slug'], activeSection)

  const style = makeStyles({
    root: tw`mt-8 md:mt-16`,
    text: [ tw`overflow-scroll p-4 `, '$border', { height: 600 } ],
  })

  return (
    Layout({ location, title: 'The Book' },
      Toc({
        ...css(tw`mt-8 mb-12`),
        sections,
        activeSectionPath,
        trailingNote: 'This is a work in progress, please keep checking back' }),
      Div(style('root'),
        SectionTitle(0, activeSection.frontmatter.title),
        Div({
          ...style('text'),
          ...innerHtml(activeSection.html)
        })
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
      fields {
        slug
      }
    }
  }
`

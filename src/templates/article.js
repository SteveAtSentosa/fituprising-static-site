import { graphql } from 'gatsby'
import { propOr } from 'ramda'
import { Div, innerHtml } from '../utils/render'
import { makeStyles } from '../utils/style'
import { Layout } from '../components/layout'

const Article = ({ data }) => {
  const fallback = { html: '<p>Hmmm, something went wrong... </p>', frontmatter: {} }
  const article = propOr(fallback, 'markdownRemark', data)
  const style = makeStyles({
    root: tw`mt-8 md:mt-16`,
    title: tw`text-lg font-semibold text-fu-purple`,
    summary: tw`mt-1 mb-4 text-base md:text-sm text-grey-500 font-thin`,
  })

  return (
    Layout({ location, title: 'Explore Your Mind' },
      Div(style('root'),
        Div(style('title'), article.frontmatter.title),
        Div(style('summary'), article.frontmatter.summary),
        Div(innerHtml(article.html))
      )
    ))
}

export default Article

export const pageQuery = graphql`
  query ArticleQuery( $slug: String!) {
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

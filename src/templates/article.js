import { propOr } from 'ramda'
import { ce, innerHtml } from '../utils/render';
import { makeStyles } from '../utils/style';
import Layout from '../components/layout'

const Article = ({data}) => {
  const fallback = { html: '<p>Hmmm, something went wrong... </p>', frontmatter: {}};
  const article = propOr(fallback, 'markdownRemark', data);
  const style = makeStyles({
    root: tw`mt-8 md:mt-16`,
    title: tw`text-lg font-semibold text-fu-purple`,
    summary: tw`mt-1 mb-4 text-base md:text-sm text-grey-500 font-mont font-thin leading-tight`,
  });

  return (
  ce(Layout, { location, title: 'Explore Your Mind' },
    ce('div', style('root'),
      ce('div', style('title'), article.frontmatter.title),
      ce('div', style('summary'), article.frontmatter.summary),
      ce('div', innerHtml(article.html))
    )
  ))
};

export default Article;

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

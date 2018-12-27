import { graphql, StaticQuery, Link } from 'gatsby'
import { makeStyles } from '../utils/style';
import { ce } from '../utils/render';
import { path, pathOr } from 'ramda';
import { innerHtml } from '../utils/render';
import Layout from '../components/layout'
import SEO from '../components/seo'




const Index = ({ data, location }) => {

  const blurb = path(['allMarkdownRemark', 'edges', 0, 'node', 'html' ], data)

  const style = makeStyles({
    root: tw`-mt-8 md:mt-16`,
  });

  return ce(Layout, { location, title: 'Be Different' },
    ce('div', { ...style('root'), ...innerHtml(blurb) }), [
      ce(Link, { key: 1, to: "/explore"}, 'Read on'),
      ce('span', { key: 2}, ', I think that you will find it fascinating!')
    ]
    // ce(LatestArticle)
  );
}

export default Index;

//*****************************************************************************
// helper components
//*****************************************************************************

function LatestArticle(props) {

  const style = makeStyles({
    root: tw`bg-grey-100 p-6 mt-8`,
    header: tw`font-mont font-semibold text-grey-400 text-base leading-none`,
    link: tw`-mt-4 text-xs text-red leading-none`,
    title: tw`mt-6 font-meri text-base font-semibold`,
  })

  return (
  ce(StaticQuery, {
    query: latestArticleQuery,
    render: ({ latestArticle }) => {
      const article = pathOr({}, ['edges', 0, 'node'], latestArticle);
      console.log('article: ', article);
      return (
        ce('div', style('root'),
          ce('div', style('header'), 'Latest Exploration'),
          ce('div', style('title'), article.frontmatter.title),
          ce('div', innerHtml(article.html))
        ))
      }
    }
  ))

}

//*****************************************************************************
// Queries
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/pages\/home\/fu-blurb.md/"}},
  ) {
    edges {
      node {
        frontmatter {
          title
        }
        html
      }
    }
  }
}`

const latestArticleQuery = graphql`
{
    latestArticle: allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\/content\/explore/"}}
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          html
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }`;
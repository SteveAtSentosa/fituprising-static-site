import { Link, graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { ce } from '../utils/render';
import { makeStyles, s } from '../utils/style';
import Layout from '../components/layout'


//*****************************************************************************
// Explore Component
//*****************************************************************************

const Explore = ({ data, location }) => {

  const edges = pathOr([], ['allMarkdownRemark', 'edges' ], data);
  const articles = edges.map( ({ node }) =>({
      slug: pathOr('', ['fields', 'slug'], node),
      frontmatter: node.frontmatter,
    })
  );

  return (
  ce(Layout, { location, title: 'Explore Your Mind' },
    ce('div', 0, articles.map((article, key) =>
      ce(ArticleTeaser, { key, article }))
    )
  ))
}

export default Explore;

//*****************************************************************************
// helper components
//*****************************************************************************


function ArticleTeaser({ article}) {

  const style = makeStyles({
    root: tw`mb-12`,
    date: tw`text-xs font-light text-grey-400`,
    title: [ tw`text-lg font-semibold text-fu-purple leading-tight`, s['no-underline']],
    teaser: tw`mt-1 text-sm`,
    more: [ tw`text-red text-xs pl-2`, s['no-underline'] ]
  });

  return (
  ce('div', style('root'),
    ce('div', style('date'), article.frontmatter.date),
    ce(Link, { ...style('title'), to: article.slug }, article.frontmatter.title),
    ce('div', style('teaser'),
      ce('span', 0, article.frontmatter.summary),
      ce(Link, { ...style('more'), to: article.slug }, '(read more)')
    )


  ))
}

//*****************************************************************************
// page query
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/explore/"}}
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


// {
//   allMarkdownRemark(
//     filter: { fileAbsolutePath: {regex : "\/content\/explore/"}},
//   ) {
//     edges {
//       node {
//         frontmatter {
//           title
//           date
//           summary
//         }
//         html
//       }
//     }
//   }
// }`



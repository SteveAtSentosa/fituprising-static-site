import { Link, graphql } from 'gatsby'
import { pathOr } from 'ramda'
import { ce } from '../utils/render';
import { makeStyles, s } from '../utils/style';
import Layout from '../components/layout'
import Posts from '../components/posts'


//*****************************************************************************
// Explore Component
//*****************************************************************************

const Explore = ({ data, location }) => {

  const edges = pathOr([], ['allMarkdownRemark', 'edges' ], data);
  const articles = edges.map( ({ node }) =>({
      title: pathOr('', ['frontmatter', 'title'], node),
      date: pathOr('', ['frontmatter', 'date'], node),
      summary: pathOr('', ['frontmatter', 'summary'], node),
      path: pathOr('', ['fields', 'slug'], node),
    })
  );

  return (
  ce(Layout, { location, title: 'Explore Your Mind' },
    ce(Posts, { articles })
  ))
}

export default Explore;

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


// const paragraphs = [
// `When it comes to weight loss, we all know what to do.`,
// ``
// ]

// function About({ className }) {

//   const style = makeStyles({
//     root: [ tw`px-2 py-2 bg-grey-500 text-sm text-white`, className],
//   });

//   return ce('div', style('root'), 'About')

// }

// function ArticleTeaser({ article, className }) {

//   const style = makeStyles({
//     root: className,
//     date: tw`text-xs font-light text-grey-400`,
//     title: [ tw`text-lg font-semibold text-fu-purple leading-tight`, s['no-underline']],
//     teaser: tw`mt-1 text-sm`,
//     more: [ tw`text-red text-xs pl-2`, s['no-underline'] ]
//   });

//   return (
//   ce('div', style('root'),
//     ce('div', style('date'), article.frontmatter.date),
//     ce(Link, { ...style('title'), to: article.slug }, article.frontmatter.title),
//     ce('div', style('teaser'),
//       ce('span', 0, article.frontmatter.summary),
//       ce(Link, { ...style('more'), to: article.slug }, '(read more)')
//     )
//   ))
// }




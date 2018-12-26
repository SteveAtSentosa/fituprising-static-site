import { graphql } from 'gatsby'
import { withState } from 'recompose';
import { pathOr } from 'ramda'
import { ce } from '../utils/render';
import { makeStyles, makeStyles2 } from '../utils/style';
import { innerHtml } from '../utils/render';
import Layout from '../components/layout'

const Explore = ({ data, location, articleIdx, setArticleIdx }) => {

  const edges = pathOr([], ['allMarkdownRemark', 'edges' ], data);
  const articles = edges.map( ({ node }) => ({
    frontmatter: node.frontmatter,
    html: node.html,
  }));

  const style = makeStyles({
    root: tw`flex`,
    articleList: tw`w-1/4 mr-8`,
    article: tw`w-3/4`
  });

  const onClick = idx => setArticleIdx(idx);

  return (
  ce(Layout, { location, title: 'Explore Your Mind' },
    ce('div', style('root'),
      ce(ArticleList, { ...style('articleList'), articles, onClick }),
      ce(Article, { ...style('article'), article: articles[articleIdx] })
    )
  ))
}

export default withState(
  'articleIdx', 'setArticleIdx', 0
)(Explore);

//*****************************************************************************
// helper components
//*****************************************************************************

function ArticleList({ articles, onClick, className }) {

  const style = makeStyles({
    root: [ tw`p-2 rounded font-mont bg-grey-200 overflow-scroll`, className ],
    title: tw`text-xs p-2 text-fu-purple opacity-75 hover:underline hover:cursor-pointer`
  });

  return (
  ce('div', style('root'), articles.map( (article, idx) =>
    ce('div', { ...style('title'), key: idx, onClick: () => onClick(idx) },
      article.frontmatter.title)
    )
  ))
}

function Article({ article, className}) {

  const style = makeStyles({
    root: [ tw``, className],
    title: tw`-mt-1`
  });

  return (
  ce('div', style('root'),
    ce('h3', style('title'), article.frontmatter.title),
    ce('div', innerHtml(article.html))
  ))

}

//*****************************************************************************
// page query
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/explore/"}},
  ) {
    edges {
      node {
        frontmatter {
          title
          date
          summary
        }
        html
      }
    }
  }
}`



import { graphql } from 'gatsby'
import { makeStyles } from '../utils/style';
import { ce } from '../utils/render';
import { path } from 'ramda';
import { innerHtml } from '../utils/render';
import Layout from '../components/layout'
import SEO from '../components/seo'




const Index = ({ data, location }) => {

  const blurb = path(['allMarkdownRemark', 'edges', 0, 'node', 'html' ], data)
  const style = makeStyles({
    root: tw``
  });

  return ce(Layout, { location },
    ce('div', { ...style('root'), ...innerHtml(blurb) })
  );
}

export default Index;

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



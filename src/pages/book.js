import { graphql } from 'gatsby'
import { pathOr, propOr } from 'ramda'
import withState from 'recompose/withState'
import { Layout } from '../components/layout'
import { Toc } from '../components/toc'
import { makeStyles } from '../utils/style'
import { Div } from '../utils/render'
import { BookSection } from '../components/book-section'

//*****************************************************************************
// Component
//*****************************************************************************

export default withState(
  'activeSectionIdx', 'setActiveSectionIdx', 0)(BookComponent)

function BookComponent(props) {

  const { data, location } = props
  const { activeSectionIdx, setActiveSectionIdx } = props

  const edges = pathOr([], [ 'allMarkdownRemark', 'edges' ], data)
  const sections = edges.map(({ node }) => ({
    title: pathOr('', ['frontmatter', 'title'], node),
    html: propOr('', 'html', node),
  }))

  const activeSection = sections[activeSectionIdx]
  const onEntryClick = ({ idx }) => setActiveSectionIdx(idx)

  const style = makeStyles({
    header: tw`font-mont text-4xl text-grey-400 leading-tight`,
    toc: tw`mt-2 mb-12`,
    text: [ tw`overflow-scroll p-4 `, '$border', { height: 600 } ],
  })

  return (
    Layout({ location, title: 'The Book' },
      Div(style('header'), 'Fit Uprising - Be Different'),
      Toc({
        ...style('toc'),
        sections,
        activeSectionIdx,
        onEntryClick,
        trailingNote: `This is a work in progress, check back every now and then.`
      }),
      BookSection({
        title: activeSection.title,
        html: activeSection.html,
      })
    ))
}


//*****************************************************************************
// Query
//*****************************************************************************

export const pageQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content\/book/"}}
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 1000
  ) {
    edges {
      node {
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
  }
}`

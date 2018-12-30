// import { Link } from 'gatsby'
import PT from 'prop-types'
import { componentify, makePropSpec, Div, Span, Link } from '../utils/render'
import { makeStyles } from '../utils/style'

//*****************************************************************************
// Interface
//*****************************************************************************

const articlesShape = PT.arrayOf(PT.shape({
  title: PT.string.isRequired,
  path: PT.string.isRequired,
  date: PT.string,
  summary: PT.string,
}))

const propSpec = makePropSpec([
  [ 'articles', articlesShape, [] ], // list of articles to display
])

//*****************************************************************************
// Component
//*****************************************************************************

const PostsComponent = ({ articles, className }) => {

  const style = makeStyles({
    root: [ tw``, className ],
    summary: tw`mb-12`,
    date: tw`text-xs font-light text-grey-400`,
    title: [ tw`text-lg font-semibold text-fu-purple leading-tight`, '$no-underline' ],
    teaser: tw`text-base md:text-sm text-grey-500 font-thin`,
    more: [ tw`text-red text-xs pl-2`, '$no-underline' ]
  })

  return (
    Div(style('root'), articles.map((article, key) =>
      Div({ ...style('summary'), key },
        Div(style('date'), article.date),
        Link({ ...style('title'), to: article.path }, article.title),
        Div(0,
          Span(style('teaser'), article.summary),
          Link({ ...style('more'), to: article.path }, '(read more)')
        )
      ))
    )
  )
}

export default PostsComponent
export const Posts = componentify(PostsComponent, propSpec)

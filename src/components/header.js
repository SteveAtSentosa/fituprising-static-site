import PT from 'prop-types'
import { ce, componentify, makePropSpec, Link, Div } from '../utils/render'
import { makeStyles, css } from '../utils/style'
import { Bio } from '../components/bio'

//*****************************************************************************
// Interface
//*****************************************************************************

const pagesShape = PT.arrayOf(PT.shape({
  text: PT.string,
  to: PT.string,
}))

const propSpec = makePropSpec([
  [ 'title', PT.string, '' ], // underneath the logo
  [ 'pages', pagesShape, [] ], // list of page paths
  [ 'path', PT.string.isRequired, '/' ], // path of the current page
])

//*****************************************************************************
// Component
//*****************************************************************************

const HeaderComponent = ({ title, pages, path }) => {

  const titleLinkPath = '/' + path.split('/')[1]

  const style = makeStyles({
    root: tw`font-mont mb-4  md:mb-12`,
    header: tw`h-16 md:h-20`,
    logo: tw`-mb-2 text-4xl leading-tight font-semibold`,
    title: tw`text-grey-400 text-lg `,
    nav: tw`mt-4 md:-mt-2 mb-8`
  })

  return (
    Div(style('root'),
      Div(style('header'),
        Logo({ ...style('logo') }),
        Title({ ...style('title'), title, titleLinkPath })
      ),
      Nav({ ...style('nav'), pages, path }),
      Bio()
    )
  )
}

export const Header = componentify(HeaderComponent, propSpec)

//*****************************************************************************
// Helpers
//*****************************************************************************

function Logo(...args) { return ce(LogoComponent, ...args) }
function LogoComponent({ className }) {
  const style = makeStyles({
    root: className,
    f: [ tw`text-fu-green `, '$no-underline' ],
    u: [ tw`text-fu-purple`, '$no-underline' ],
  })

  return Div(style('root'),
    Link({ ...style('f'), to: '/' }, 'fit'),
    Link({ ...style('u'), to: '/' }, 'Uprising')
  )
}

function Title(...args) { return ce(TitleComponent, ...args) }
function TitleComponent({ title, titleLinkPath, className }) {
  return (
    Link({ ...css([ '$no-underline', className ]), to: titleLinkPath }, title)
  )
}

function Nav(...args) { return ce(NavComponent, ...args) }
function NavComponent({ pages, path, className }) {

  const baseLinkStyle = [ tw`text-base md:text-sm mr-6 md:mr-12 text-grey-400`, '$no-underline' ]
  const activeStyle = tw`text-black`
  const style = makeStyles({
    root: [ tw`py-1 flex flex-col md:flex-row`, className ],
    link: baseLinkStyle,
    activeLink: [ baseLinkStyle, activeStyle ]
  })

  const activePage = to => !!path.match(`${to}`)
  /// const activePage = to => to === path
  const linkStyle = to => activePage(to) ? 'activeLink' : 'link'
  return (
    Div(style('root'), pages.map(({ to, text }, key) =>
      Link({ ...style(linkStyle(to)), key, to, }, text)
    ))
  )
}


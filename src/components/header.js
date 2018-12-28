import PT from 'prop-types'
import { ce, makeProps, applyProps, Link, Div } from '../utils/render'
import { makeStyles, s } from '../utils/style'

//*****************************************************************************
// Interface
//*****************************************************************************

const pagesShape = PT.arrayOf(PT.shape({
  text: PT.string,
  to: PT.string,
}))

const propSpecs = makeProps([
  [ 'title', PT.string, '' ], // underneath the logo
  [ 'pages', pagesShape, [] ], // list of page paths
  [ 'path', PT.string.isRequired, '/' ], // path of the current page
])

//*****************************************************************************
// Component
//*****************************************************************************

const HeaderComponent = applyProps(({ title, pages, path }) => {

  const titleLinkPath = '/' + path.split('/')[1]

  const style = makeStyles({
    root: tw`font-mont mb-4  md:mb-12`,
    header: tw`h-16 md:h-20`,
    logo: tw`-mb-2 md:mb-2 text-lg md:text-base leading-none font-semibold`,
    title: tw`-ml-1 leading-normal md:leading-normal text-grey-400 text-3xl md:text-5xl`,
    nav: tw`mt-0`
  })

  return (
    Div(style('root'),
      Div(style('header'),
        Logo({ ...style('logo') }),
        Title({ ...style('title'), title, titleLinkPath })
      ),
      Nav({ ...style('nav'), pages, path })
    )
  )
}, propSpecs)

export default HeaderComponent
export const Header = (...args) => ce(HeaderComponent, ...args)


//*****************************************************************************
// Helpers
//*****************************************************************************

function Logo(...args) { return ce(LogoComponent, ...args) }
function LogoComponent({ className }) {
  const style = makeStyles({
    root: className,
    f: [ tw`text-fu-green`, s['no-underline'] ],
    u: [ tw`text-fu-purple`, s['no-underline'] ],
  })

  return Div(style('root'),
    Link({ ...style('f'), to: '/' }, 'fit'),
    Link({ ...style('u'), to: '/' }, 'Uprising')
  )
}

function Title(...args) { return ce(TitleComponent, ...args) }
function TitleComponent({ title, titleLinkPath, className }) {
  const style = makeStyles({
    title: [ s['no-underline'], className ],
  })
  return (
    Link({ ...style('title'), to: titleLinkPath }, title)
  )
}

function Nav(...args) { return ce(NavComponent, ...args) }
function NavComponent({ pages, path, className }) {

  const baseLinkStyle = [ tw`text-base md:text-sm mr-6 md:mr-12 text-grey-400`, s['no-underline'] ]
  const activeStyle = tw`text-black`
  const style = makeStyles({
    root: [ tw`py-1 flex flex-col md:flex-row`, className ],
    link: baseLinkStyle,
    activeLink: [ baseLinkStyle, activeStyle ]
  })

  const activePage = to => to === path
  const linkStyle = to => activePage(to) ? 'activeLink' : 'link'
  return (
    Div(style('root'), pages.map(({ to, text }, key) =>
      Link({ ...style(linkStyle(to)), key, to, }, text)
    ))
  )
}


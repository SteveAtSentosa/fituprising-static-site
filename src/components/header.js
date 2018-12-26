import PT from 'prop-types';
import { Link } from 'gatsby';
import { ce } from '../utils/render';
import { makeStyles, s } from '../utils/style';
import { makePropSpecs, applyPropSpecs } from '../utils/render';


//*****************************************************************************
// Interface
//*****************************************************************************

const pagesShape = PT.arrayOf(PT.shape({
  text: PT.string,
  to: PT.string,
}))

const propSpecs = makePropSpecs([
  [ 'title', PT.string,             ''  ], // underneath the logo
  [ 'pages', pagesShape,            []  ], // list of page paths
  [ 'path',  PT.string.isRequired,  '/' ], // path of the current page
]);

//*****************************************************************************
// Component
//*****************************************************************************

const Header = ({ title, pages, path }) => {

  const home = path === '/';
  const style = makeStyles({
    root: tw`font-mont mb-16`,
    title: [ tw`leading-none text-grey-400`, home ? tw`text-xl pt-1` : tw`text-5xl` ],
    header: tw`h-20`,
  });

  return ce('div', style('root'),
    ce('div', style('header'),
      ce(Logo, { home }),
      title && ce('div', style('title'), title)
    ),
    ce(Nav, { pages, path })
  )
}


export default applyPropSpecs(Header, propSpecs);

//*****************************************************************************
// Helpers
//*****************************************************************************

function Logo({ home }) {

  const style = makeStyles({
    root: [ tw`leading-none font-semibold`, home ? tw`text-6xl` : tw`text-base` ],
    f: [ tw`text-fu-green`, s['no-underline']],
    u: [ tw`text-fu-purple`, s['no-underline']],
  })

  return ce( 'div', style('root'),
    ce(Link, { ...style('f'), to: '/' }, 'fit'),
    ce(Link, { ...style('u'), to: '/' }, 'Uprising')
  )
}

function Nav({ pages, path }) {

  const linkStyle = tw`text-sm mr-12 text-grey-400`;
  const style = makeStyles({
    link: linkStyle,
    linkNoUnderline: [ linkStyle, s['no-underline'] ],
  })

  const activePage = to => to === path;
  return ce( 'div', 0, pages.map( ({ to, text}, key) => {
    const styleName = activePage(to) ? 'link' : 'linkNoUnderline';
    return ce(Link, { ...style(styleName), key, to, }, text)
  }));
}

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
  const titleLinkPath = '/' + path.split('/')[1];

  const style = makeStyles({
    root: tw`font-mont mb-4  md:mb-12`,
    header: tw`h-16 md:h-20`,
    logo: tw`-mb-2 md:mb-2 text-lg md:text-base leading-none font-semibold`,
    title: tw`-ml-1 leading-normal md:leading-normal text-grey-400 text-3xl md:text-5xl`,
    nav: tw`mt-0`
  });

  return ce('div', style('root'),
    ce('div', style('header'),
      ce(Logo, { ...style('logo'), home }),
      ce(Title, { ...style('title'), home, title, titleLinkPath })
    ),
    ce(Nav, { ...style('nav'), pages, path })
  )
}


export default applyPropSpecs(Header, propSpecs);

//*****************************************************************************
// Helpers
//*****************************************************************************

function Logo({ home, className }) {

  const style = makeStyles({
    root: className,
    f: [ tw`text-fu-green`, s['no-underline']],
    u: [ tw`text-fu-purple`, s['no-underline']],
  })

  return ce( 'div', style('root'),
    ce(Link, { ...style('f'), to: '/' }, 'fit'),
    ce(Link, { ...style('u'), to: '/' }, 'Uprising')
  )
}

function Title({ home, title, titleLinkPath, className }) {

  const style = makeStyles({
    title: [ s['no-underline'], className ],
  })
  return (
    ce(Link, { ...style('title'), to: titleLinkPath }, title)
  )
}


function Nav({ pages, path, className }) {

  const linkStyle = [ tw`text-base md:text-sm mr-6 md:mr-12 text-grey-400`, s['no-underline']];
  const activeStyle = tw`text-black`;
  const style = makeStyles({
    root: [ tw`py-1 flex flex-col md:flex-row`, className ],
    link: linkStyle,
    activeLink: [ linkStyle, activeStyle ]
  })

  const activePage = to => to === path;``
  return ce( 'div', style('root'), pages.map( ({ to, text}, key) => {
    const finalStyle = activePage(to) ? style('activeLink') : style('link');
    return ce(Link, { ...finalStyle, key, to, }, text)
  }));
}

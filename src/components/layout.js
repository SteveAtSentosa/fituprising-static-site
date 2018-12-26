import { ce } from '../utils/render';
import { makeStyles } from '../utils/style';

import Header from './header'

const pages =[
  { to: '/', text: 'Home' },
  { to: '/explore', text: 'Explore Your Mind' },
  { to: '/gospel', text: 'Fit Uprising Gospel' },
];


const Layout = props =>  {

  const { location, title, children } = props
  const path = location.pathname;

  const style = makeStyles({
    root: tw`max-w-2xl, px-32 py-10`,
  })

  return ce('div', style('root'),
    ce(Header, { title, pages, path } ),
    children
  )
}

export default Layout

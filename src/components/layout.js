import { ce } from '../utils/render';
import { Global, css } from '@emotion/core'
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

  const globalStyles = css`
    h3 { font-size: 1.125rem !important; color #673ab7 !important;}
    p { font-size: 100% !important; }
  `

  const style = makeStyles({
    root: [ tw`px-8 py-10 md:px-32 `, { maxWidth: 800 }]
  })

  return ce('div', style('root'),
    ce(Global, {styles: globalStyles }),
    ce(Header, { title, pages, path } ),
    children
  )
}

export default Layout

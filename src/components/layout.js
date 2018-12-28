import { ce, Div, GlobalStyles } from '../utils/render'
import { css } from '@emotion/core'
import { makeStyles } from '../utils/style'
import { Header } from './header'

const pages = [
  { to: '/', text: 'Home' },
  { to: '/explore', text: 'Explore Your Mind' },
  { to: '/gospel', text: 'Fit Uprising Gospel' },
]

const LayoutComponent = props => {

  const { location, title, children } = props
  const path = location.pathname

  const globalStyles = css`
    h3 { font-size: 1.125rem !important; color #673ab7 !important;}
  `

  const style = makeStyles({
    root: [ tw`px-8 py-10 md:px-32 `, { maxWidth: 800 } ]
  })

  return (
    Div(style('root'),
      GlobalStyles({ styles: globalStyles }),
      Header({ title, pages, path }),
      children
    )
  )
}

export default LayoutComponent
export const Layout = (...args) => ce(LayoutComponent, ...args)

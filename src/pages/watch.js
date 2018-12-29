import { ce } from '../utils/render'
import Layout from '../components/layout'

const Gospel = ({ data, location }) => {
  return ce(Layout, { location, title: 'Watch Steve Lose' })
}

export default Gospel;

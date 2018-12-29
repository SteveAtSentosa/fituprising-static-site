import { ce } from '../utils/render'
import Layout from '../components/layout'
import { SectionTitle } from '../components/section-title'


const Watch = ({ data, location }) => {
  return (
    ce(Layout,
      { location, title: 'Watch Steve Lose' },
      SectionTitle(0, 'Coming Soon, I promise!')
    )
  )
}

export default Watch


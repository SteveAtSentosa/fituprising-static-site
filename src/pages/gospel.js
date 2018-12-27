import React from 'react'
import { Link, graphql } from 'gatsby'
import { ce } from '../utils/render';
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const Gospel = ({ data, location }) => {
  return ce(Layout, { location, title: 'Gospel' }
  )
}

export default Gospel;

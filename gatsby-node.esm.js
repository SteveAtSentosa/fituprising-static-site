import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import { pathOr, curry } from 'ramda'

const createPageFromNode = curry((createPageFn, node, template, context = {}) => {

  return createPageFn({
    path: node.fields.slug,
    component: template,
    context: {
      slug: node.fields.slug,
      ...context
    },
  })
})

const bookSectionFromNode = node => ({
  title: pathOr('', ['frontmatter', 'title'], node),
  path: pathOr('', ['fields', 'slug'], node)
})

export const createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const bookSectionTemplate = path.resolve(`src/templates/book-section.js`)

  createRedirect({
    fromPath: `/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/blog/`,
  })

  const newPage = createPageFromNode(createPage)
  return new Promise((resolve, reject) => {
    resolve(
      graphql(contentGraphQl).then(result => {
        if (result.errors) {
          return reject(result.errors)
        }
        const blogPosts = pathOr([], ['data', 'blogPosts', 'edges'], result)
        blogPosts.forEach(({ node }) => newPage(node, blogPostTemplate))

        const bookSections = pathOr([], ['data', 'bookSections', 'edges'], result)
        bookSections.forEach(({ node }) => newPage(node, bookSectionTemplate, {
          sections: bookSections.map(({ node }) => bookSectionFromNode(node))
        }))

        const firstSection = bookSectionFromNode(bookSections[0].node)
        createRedirect({
          fromPath: `/book`,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: firstSection.path,
        })
      })
    )
  })
}

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

const contentGraphQl = `
  query Content {
    blogPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\/content\/blog/"}}
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      ){
        edges {
        node {
          frontmatter {
            title
            date
            summary
          }
          fields {
            slug
          }
        }
      }
    }
    bookSections: allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\/content\/book/"}}
      sort: { order: ASC, fields: [fields___slug] }
      limit: 1000
      ){
        edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }`

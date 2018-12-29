const path = require("path")
const { createFilePath, } = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`src/templates/blog-post.js`)
  return new Promise((resolve, reject) => {
   resolve(graphql(
  `
        {
            allMarkdownRemark(
              filter: { fileAbsolutePath: {regex : "\/content/"}}
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1000
            ) {
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
          }
  `
  ).then(result => {
                if (result.errors) {
                    return reject(result.errors)
                }
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    createPage({
                        path: node.fields.slug,
                        component: articleTemplate,
                        context: {
                            slug: node.fields.slug,
                        }, // additional data can be passed via context
                    })
                })
                return
            })
        )
    })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
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


const contentQuery = graphql`
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content/"}}
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
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
}
`
graphql`
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
      sort: { order: DESC, fields: [frontmatter___date] }
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


  const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const articleTemplate = path.resolve(`src/templates/blog-post.js`)

  createRedirect({
    fromPath: `/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/blog/`,
  })

  const content = await graphql(contentGraphQl)
  if (content.errors) throw content.errors

  // return new Promise((resolve, reject) => {
  //   resolve(
  //     graphql(contentGraphQl).then(result => {
  //       console.log('result', JSON.stringify(result, null, 2))
  //       if (result.errors) {
  //         return reject(result.errors)
  //       }
  //       result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //         createPage({
  //           path: node.fields.slug,
  //           component: articleTemplate,
  //           context: {
  //             slug: node.fields.slug,
  //           }, // additional data can be passed via context
  //         })
  //       })
  //     })
  //   )
  // })
}


// exports.createPages = ({ actions, graphql }) => {
//   const { createPage, createRedirect } = actions
//   const articleTemplate = path.resolve(`src/templates/blog-post.js`)

//   createRedirect({
//     fromPath: `/`,
//     isPermanent: true,
//     redirectInBrowser: true,
//     toPath: `/blog/`,
//   })

//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(contentGraphQl).then(result => {
//         console.log('result', JSON.stringify(result, null, 2))
//         if (result.errors) {
//           return reject(result.errors)
//         }
//         result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//           createPage({
//             path: node.fields.slug,
//             component: articleTemplate,
//             context: {
//               slug: node.fields.slug,
//             }, // additional data can be passed via context
//           })
//         })
//       })
//     )
//   })
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
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
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/content/" } }
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 1000
  ) {
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
}
`
const contentGraphQl2 = `
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
      sort: { order: DESC, fields: [frontmatter___date] }
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

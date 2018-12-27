const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const articleTemplate = path.resolve(`src/templates/article.js`)
    return new Promise((resolve, reject) => {
        resolve(graphql(`
        {
            allMarkdownRemark(
              filter: { fileAbsolutePath: {regex : "\/content\/explore/"}}
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
  `).then(result => {
                if (result.errors) {
                    return reject(result.errors)
                }
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    console.log('node', JSON.stringify(node, null, 2));
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

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      cover: File @fileByRelativePath
      external: String
      cta: String
      tech: [String]
      github: String
      lang: String
      date: String
      slug: String
    }
    type Fields {
      slug: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  
  if (node.internal.type === 'MarkdownRemark' && node.fileAbsolutePath.includes('/featured/')) {
    // Use the frontmatter slug if available, otherwise generate one
    const slug = node.frontmatter.slug || `/performance/${node.frontmatter.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')}`;
      
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');
  const performanceTemplate = path.resolve('src/templates/performance.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      featuredRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tech
              lang
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {},
    });
  });

  // Create performance pages
  const performancePages = result.data.featuredRemark.edges;

  performancePages.forEach(({ node }) => {
    // Use frontmatter slug if available, otherwise use the field slug
    const pagePath = node.frontmatter.slug || node.fields.slug;
    
    if (pagePath) {
      // Create pages for both English and Spanish content
      const languages = ['en', 'es'];
      languages.forEach(lang => {
        // Only create Spanish version if it exists
        if (lang === 'es' && node.frontmatter.lang !== 'es') {
          console.log(`Skipping Spanish version for ${pagePath} - no Spanish content found`);
          return;
        }
        
        console.log(`Creating ${lang} performance page for ${pagePath}`);
        createPage({
          path: `${pagePath}${lang === 'es' ? '?lang=es' : ''}`,
          component: performanceTemplate,
          context: {
            slug: pagePath,
            language: lang
          },
        });
      });
    }
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

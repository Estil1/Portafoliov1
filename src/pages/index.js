import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Projects, Contact } from '@components';
import Featured from '@components/sections/featured';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured data={data} />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    featured: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/featured/(en|es)/" }
      }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                gatsbyImageData(width: 700, placeholder: BLURRED)
              }
            }
            tech
            github
            external
            cta
            lang
            slug
          }
          html
        }
      }
    }
  }
`;

export default IndexPage;

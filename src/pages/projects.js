import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import Featured from '@components/sections/featured';

const StyledMainContainer = styled.main`
  counter-reset: section;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;
  
  @media (max-width: 768px) {
    padding: 80px 25px;
  }
`;

const ProjectsPage = ({ data, location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Featured data={data} />
    </StyledMainContainer>
  </Layout>
);

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

export default ProjectsPage;
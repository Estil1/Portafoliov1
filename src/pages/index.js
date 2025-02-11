import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Projects, Contact } from '@components';
import Featured from '@components/sections/featured';
=======
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

<<<<<<< HEAD
const IndexPage = ({ data, location }) => (
=======
const IndexPage = ({ location }) => (
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
<<<<<<< HEAD
      <Featured data={data} />
=======
      <Featured />
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
<<<<<<< HEAD
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

=======
};

>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
export default IndexPage;

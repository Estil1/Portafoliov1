import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
=======
import { useStaticQuery, graphql } from 'gatsby';
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { useLanguage } from '../../context/LanguageContext';
<<<<<<< HEAD
import { translations } from '@utils/translations';
=======
import { translations } from '../../translations';
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

<<<<<<< HEAD
    a {
      @media (hover: hover) {
        &:hover,
        &:focus {
          color: var(--green);
=======
    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
<<<<<<< HEAD
    flex-wrap: wrap;
    position: relative;
    margin-top: 20px;
    gap: 15px;
=======
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
<<<<<<< HEAD
=======
      padding: 10px;
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

<<<<<<< HEAD
      &.button {
        ${({ theme }) => theme.mixins.smallButton};
        padding: 12px 16px;
        font-size: var(--fz-xs);
        font-family: var(--font-mono);
        line-height: 1;
        text-decoration: none;
        cursor: pointer;
        transition: var(--transition);
        
        &:hover, 
        &:focus {
          background-color: var(--green-tint);
          outline: none;
        }
        
        &:after {
          display: none !important;
        }
      }

=======
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
      svg {
        width: 20px;
        height: 20px;
      }
    }
<<<<<<< HEAD
=======

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

<<<<<<< HEAD
const Featured = ({ data }) => {
=======
const Featured = () => {
  const data = useStaticQuery(graphql`
    {
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
            }
            html
          }
        }
      }
    }
  `);

>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
  const { language } = useLanguage();
  const content = translations[language].featured;
  const featuredProjects = data.featured.edges.filter(({ node }) => 
    node.frontmatter.lang === language
  );
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        {content.title}
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
<<<<<<< HEAD
            const { external, title, tech, github, cover, cta, slug } = frontmatter;
            const image = getImage(cover);
            const isMusicTrack = !!slug && slug.startsWith('/performance/');
            const linkPath = isMusicTrack ? `${slug}${slug.includes('?') ? '&' : '?'}lang=${language}` : null;
=======
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = getImage(cover);
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">{content.subtitle}</p>

                    <h3 className="project-title">
<<<<<<< HEAD
                      {isMusicTrack && linkPath ? (
                        <Link to={linkPath}>{title}</Link>
                      ) : (
                        <a href={external || '#'}>{title}</a>
                      )}
=======
                      <a href={external}>{title}</a>
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech && tech.length > 0 && (
<<<<<<< HEAD
                      <ul className="project-tech-list">
                        {tech.map((techItem, i) => (
                          <li key={i}>{techItem}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {isMusicTrack && linkPath && (
                        <>
                          <Link to={linkPath} className="button">
                            {language === 'en' ? 'View Performance Report' : 'Ver Reporte de Rendimiento'}
                          </Link>
                          {cta && (
                            <a href={cta} aria-label="Course Link" className="button">
                              {language === 'en' ? 'Learn More' : 'Ver más'}
                            </a>
                          )}
                        </>
                      )}
                      {!isMusicTrack && cta && (
                        <a href={cta} aria-label="Course Link" className="button">
                          {language === 'en' ? 'Learn More' : 'Ver más'}
=======
                    <ul className="project-tech-list">
                   {tech.map((techItem, i) => (
                      <li key={i}>{techItem}</li>
                                              ))}
                                          </ul>
                                                   )}


                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          {language === 'en' ? 'Click here' : 'Ver más'}
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
<<<<<<< HEAD
                      {external && !cta && !isMusicTrack && (
=======
                      {external && !cta && (
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
<<<<<<< HEAD
                  {isMusicTrack && linkPath ? (
                    <Link to={linkPath}>
                      <GatsbyImage image={image} alt={title} className="img" />
                    </Link>
                  ) : (
                    <a href={external || github || '#'}>
                      <GatsbyImage image={image} alt={title} className="img" />
                    </a>
                  )}
=======
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

<<<<<<< HEAD
Featured.propTypes = {
  data: PropTypes.shape({
    featured: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              tech: PropTypes.array,
              github: PropTypes.string,
              external: PropTypes.string,
              cta: PropTypes.string,
              lang: PropTypes.string,
              slug: PropTypes.string,
              cover: PropTypes.object,
            }),
            html: PropTypes.string,
          }),
        }),
      ),
    }),
  }).isRequired,
};

=======
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7
export default Featured;

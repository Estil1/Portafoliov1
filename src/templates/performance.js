import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import { MusicAnalyticsDashboard } from '../components/analytics';
import { useLanguage } from '../context/LanguageContext';
import { translations as siteTranslations } from '@utils/translations';

const StyledMainContainer = styled.main`
  counter-reset: section;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;
  
  @media (max-width: 768px) {
    padding: 80px 25px;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 50px;
  text-align: center;
`;

const StyledTitle = styled.h1`
  margin: 0 0 20px;
  font-size: clamp(40px, 5vw, 60px);
  color: var(--lightest-slate);
`;

const StyledSubtitle = styled.h2`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  font-weight: 400;
  line-height: 1.5;
`;

const StyledSection = styled.section`
  margin: 50px 0;
`;

const StyledSectionTitle = styled.h3`
  font-size: var(--fz-heading);
  color: var(--lightest-slate);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  position: relative;
  
  &:before {
    counter-increment: section;
    content: '0' counter(section) '.';
    margin-right: 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
    font-weight: 400;
  }
`;

const StyledMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StyledMetricCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  background-color: var(--light-navy);
  padding: 20px;
  border-radius: var(--border-radius);
  text-align: center;
  
  h4 {
    color: var(--green);
    font-size: var(--fz-lg);
    margin-bottom: 10px;
  }
  
  p {
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    margin: 0;
  }
  
  small {
    display: block;
    color: var(--slate);
    font-size: var(--fz-sm);
    margin-top: 5px;
  }
`;

const StyledList = styled.ul`
  ${({ theme }) => theme.mixins.fancyList};
  color: var(--slate);
  font-size: var(--fz-lg);
  margin-top: 20px;

  li {
    padding-left: 30px;
    margin-bottom: 10px;
  }
`;

// Metric extraction utilities
const extractMetrics = (tech, language = 'en') => {
  const patterns = {
    en: {
      youtube: ['Views on YouTube', 'YouTube Views'],
      spotify: ['Streams on Spotify', 'Spotify Streams'],
      tiktok: ['Viral on TikTok', 'TikTok videos'],
      views: ['views on all TikTok videos', 'total views']
    },
    es: {
      youtube: ['Vistas en YouTube', 'Reproducciones en YouTube'],
      spotify: ['Reproducciones en Spotify'],
      tiktok: ['Viral en TikTok', 'videos de TikTok'],
      views: ['vistas en todos los videos de TikTok', 'vistas totales']
    }
  };

  const findMetric = (metricPatterns, defaultValue = '0') => {
    const item = tech?.find(t =>
      metricPatterns.some(p => t.toLowerCase().includes(p.toLowerCase()))
    );
    if (!item) return defaultValue;
    const matches = {
      M: /(\d+)M\+/.exec(item),
      K: /(\d+\.?\d*)K\+/.exec(item),
      raw: /[\d,]+/.exec(item)
    };
    if (matches.M) return `${matches.M[1]}M+`;
    if (matches.K) return `${matches.K[1]}K+`;
    if (matches.raw) return matches.raw[0].replace(/,/g, '');
    return defaultValue;
  };

  const langPatterns = patterns[language] || patterns.en;

  return {
    youtube: {
      views: findMetric(langPatterns.youtube, '5M+'),
      growth: '+12%'
    },
    spotify: {
      streams: findMetric(langPatterns.spotify, '1M+'),
      listeners: '500K+'
    },
    tiktok: {
      count: findMetric(langPatterns.tiktok, '134K+'),
      views: findMetric(langPatterns.views, '219964772')
    },
    chart: {
      current: '#32',
      peak: '#28'
    }
  };
};

const Performance = ({ data, location, pageContext }) => {
  const { language } = useLanguage();
  const currentLanguage = pageContext?.language || language || 'en';
  const translations = siteTranslations[currentLanguage]?.performance || siteTranslations.en.performance;

  // Handle loading state
  if (!data?.markdownRemark) {
    return (
      <Layout location={location}>
        <StyledMainContainer>
          <StyledHeader>
            <StyledTitle>Loading...</StyledTitle>
          </StyledHeader>
        </StyledMainContainer>
      </Layout>
    );
  }

  const { frontmatter } = data.markdownRemark;
  const { title, tech } = frontmatter;

  // Calculate metrics with memoization
  const metrics = useMemo(
    () => extractMetrics(tech, currentLanguage),
    [tech, currentLanguage]
  );

  return (
    <Layout location={location}>
      <StyledMainContainer>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <StyledSubtitle>{translations.subtitle}</StyledSubtitle>
        </StyledHeader>

        <StyledSection>
          <StyledSectionTitle>{translations.sections.metrics}</StyledSectionTitle>
          <StyledMetricGrid>
            <StyledMetricCard>
              <h4>{translations.metrics.youtube}</h4>
              <p>{metrics.youtube.views}</p>
              <small>{translations.metrics.last30}: {metrics.youtube.growth}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.metrics.spotify}</h4>
              <p>{metrics.spotify.streams}</p>
              <small>{translations.metrics.monthlyListeners}: {metrics.spotify.listeners}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.metrics.tiktok}</h4>
              <p>{metrics.tiktok.count}</p>
              <small>{metrics.tiktok.views} {translations.metrics.totalViews}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.metrics.chart}</h4>
              <p>{metrics.chart.current}</p>
              <small>{translations.metrics.peak}: {metrics.chart.peak}</small>
            </StyledMetricCard>
          </StyledMetricGrid>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>{translations.sections.performance}</StyledSectionTitle>
          <MusicAnalyticsDashboard data={metrics} />
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>{translations.sections.overview}</StyledSectionTitle>
          <StyledList>
            <li>
              {translations.metrics.youtube}: {metrics.youtube.views} ({translations.metrics.last30}: {metrics.youtube.growth})
            </li>
            <li>
              {translations.metrics.spotify}: {metrics.spotify.streams} ({translations.metrics.monthlyListeners}: {metrics.spotify.listeners})
            </li>
            <li>
              {translations.metrics.tiktok}: {metrics.tiktok.count} ({metrics.tiktok.views} {translations.metrics.totalViews})
            </li>
            <li>
              {translations.metrics.chart}: {metrics.chart.current} ({translations.metrics.peak}: {metrics.chart.peak})
            </li>
          </StyledList>
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ color: 'var(--green)', marginBottom: '15px' }}>{translations.platformAnalytics.title}</h4>
            <p style={{ color: 'var(--slate)' }}>
              {title} {translations.platformAnalytics.description}
            </p>
          </div>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>{translations.sections.demographics}</StyledSectionTitle>
          <StyledMetricGrid>
            <StyledMetricCard>
              <h4>{translations.demographics.age}</h4>
              <p>18-24</p>
              <small>{translations.demographics.primary}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.demographics.gender}</h4>
              <p>55% / 45%</p>
              <small>{translations.demographics.femaleMale}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.demographics.markets}</h4>
              <p>USA, LATAM</p>
              <small>45% {translations.demographics.streams}</small>
            </StyledMetricCard>
            <StyledMetricCard>
              <h4>{translations.demographics.platform}</h4>
              <p>{translations.demographics.mobile}: 85%</p>
              <small>{translations.demographics.crossPlatform}</small>
            </StyledMetricCard>
          </StyledMetricGrid>
        </StyledSection>
      </StyledMainContainer>
    </Layout>
  );
};

Performance.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        tech: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    language: PropTypes.string,
  })
};

export const pageQuery = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(
      frontmatter: {
        slug: { eq: $slug },
        lang: { eq: $language }
      }
    ) {
      frontmatter {
        title
        tech
        lang
      }
    }
  }
`;

export default Performance;
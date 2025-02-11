import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { useLanguage } from '../../context/LanguageContext';

const StyledDashboardContainer = styled.div`
  width: 100%;
  background: var(--light-navy);
  border-radius: 4px;
  padding: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StyledChartContainer = styled.div`
  position: relative;
  height: 300px;
  margin: 2rem 0;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

const translations = {
  en: {
    engagement: 'Platform Engagement (Millions)',
    geography: 'Geographic Distribution',
    platforms: ['YouTube', 'Spotify', 'TikTok', 'Instagram', 'Others'],
    regions: ['North America', 'Latin America', 'Europe', 'Asia', 'Others']
  },
  es: {
    engagement: 'Engagement por Plataforma (Millones)',
    geography: 'Distribución Geográfica',
    platforms: ['YouTube', 'Spotify', 'TikTok', 'Instagram', 'Otros'],
    regions: ['América del Norte', 'América Latina', 'Europa', 'Asia', 'Otros']
  }
};

const MusicAnalyticsDashboard = ({ data }) => {
  const { language } = useLanguage();
  const t = translations[language || 'en']; // Provide fallback to English
  const platformEngagementChartRef = useRef(null);
  const geographicDistributionChartRef = useRef(null);
  const chartsRef = useRef([]);
  
  useEffect(() => {
    if (!platformEngagementChartRef.current || !geographicDistributionChartRef.current) {
      return;
    }

    // Cleanup function to destroy previous charts
    const cleanup = () => {
      chartsRef.current.forEach(chart => {
        if (chart && chart.destroy) {
          try {
            chart.destroy();
          } catch (e) {
            console.warn('Chart cleanup error:', e);
          }
        }
      });
      chartsRef.current = [];
    };

    // Execute cleanup first
    cleanup();

    // Platform Engagement Chart
    try {
      const engagementChart = new Chart(platformEngagementChartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: t.platforms,
          datasets: [{
            label: t.engagement,
            data: [
              parseFloat(data?.metrics?.youtube?.replace('M+', '') || 0),
              parseFloat(data?.metrics?.spotify?.replace('M+', '') || 0),
              parseFloat(data?.metrics?.tiktokViews) / 1000000 || 0,
              1.5,
              0.8
            ],
            backgroundColor: [
              'rgba(255, 0, 0, 0.7)',
              'rgba(30, 215, 96, 0.7)',
              'rgba(45, 241, 242, 0.7)',
              'rgba(225, 48, 108, 0.7)',
              'rgba(100, 100, 100, 0.7)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#ccd6f6'
              }
            }
          },
          scales: {
            y: {
              ticks: { color: '#8892b0' },
              grid: { color: 'rgba(136, 146, 176, 0.1)' }
            },
            x: {
              ticks: { color: '#8892b0' },
              grid: { color: 'rgba(136, 146, 176, 0.1)' }
            }
          }
        }
      });
      chartsRef.current.push(engagementChart);
    } catch (error) {
      console.warn('Error creating engagement chart:', error);
    }

    // Geographic Distribution Chart
    try {
      const geoChart = new Chart(geographicDistributionChartRef.current.getContext('2d'), {
        type: 'pie',
        data: {
          labels: t.regions,
          datasets: [{
            data: [35, 45, 10, 7, 3],
            backgroundColor: [
              'rgba(64, 224, 208, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              display: true,
              labels: {
                color: '#ccd6f6',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: t.geography,
              color: '#ccd6f6',
              font: {
                size: 16,
                weight: 'normal'
              }
            }
          }
        }
      });
      chartsRef.current.push(geoChart);
    } catch (error) {
      console.warn('Error creating geographic chart:', error);
    }

    // Cleanup on unmount or language/data change
    return cleanup;
  }, [data, language, t]);

  return (
    <StyledDashboardContainer>
      <StyledChartContainer>
        <canvas ref={platformEngagementChartRef} />
      </StyledChartContainer>

      <StyledChartContainer>
        <canvas ref={geographicDistributionChartRef} />
      </StyledChartContainer>
    </StyledDashboardContainer>
  );
};

MusicAnalyticsDashboard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    metrics: PropTypes.shape({
      youtube: PropTypes.string,
      spotify: PropTypes.string,
      tiktokVideos: PropTypes.string,
      tiktokViews: PropTypes.string,
    }),
  }).isRequired,
};

MusicAnalyticsDashboard.defaultProps = {
  data: {
    title: '',
    metrics: {
      youtube: '0',
      spotify: '0',
      tiktokVideos: '0',
      tiktokViews: '0',
    },
  },
};

export default MusicAnalyticsDashboard;
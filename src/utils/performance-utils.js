// Get page context for performance pages
export const getPerformanceContext = ({ location }) => {
  const lang = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('lang') 
    : 'en';
  return {
    language: lang || 'en'
  };
};
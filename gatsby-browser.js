/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
<<<<<<< HEAD

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';

// Ensures that the language provider context is available globally
export const wrapRootElement = ({ element }) => {
  return (
    <LanguageProvider>
      {element}
    </LanguageProvider>
  );
};

// Preserve the language state on route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    const langParam = new URLSearchParams(location.search).get('lang');
    if (langParam && ['en', 'es'].includes(langParam)) {
      window.__LANGUAGE__ = langParam;
    }
  }
};
=======
>>>>>>> 8d1bba4d9874dd67d94c0ee654345381ae9584e7

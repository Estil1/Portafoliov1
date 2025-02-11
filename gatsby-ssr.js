/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';

// Ensures that the language provider context is available during SSR
export const wrapRootElement = ({ element }) => {
  return (
    <LanguageProvider>
      {element}
    </LanguageProvider>
  );
};

// Handle initial language state during SSR
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="language-init"
      dangerouslySetInnerHTML={{
        __html: `window.__LANGUAGE__ = window.__LANGUAGE__ || 'en';`,
      }}
    />,
  ]);
};
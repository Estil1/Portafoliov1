import React from 'react';
import PropTypes from 'prop-types';
import { LanguageProvider } from '../context/LanguageContext';

// This wrapper wraps ALL pages, including templates
const Wrapper = ({ element }) => {
  return (
    <LanguageProvider>
      {element}
    </LanguageProvider>
  );
};

// Define proptypes to prevent issues with SSR
Wrapper.propTypes = {
  element: PropTypes.node.isRequired,
};

export default Wrapper;
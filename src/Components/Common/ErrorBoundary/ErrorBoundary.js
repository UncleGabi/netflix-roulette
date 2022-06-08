import React from "react";
import PropTypes from "prop-types";

import "./ErrorBoundary.scss";

const ErrorBoundary = ({ hasError, children }) => {
  return (
    <div>
      {hasError ? (
        <div className="error-boundary">Ooops, something went wrong...</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

ErrorBoundary.prototype = {
  hasError: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export default ErrorBoundary;

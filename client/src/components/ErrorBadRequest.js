import React, { useState } from 'react';
import './ErrorBadRequest.css';

function ErrorBadRequest(props) {


  return (
    <>
      <div class="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p>Not Found</p>
        </div>
      </div>
      <div id="particles-js"></div>
    </>
  )
}

export default ErrorBadRequest;
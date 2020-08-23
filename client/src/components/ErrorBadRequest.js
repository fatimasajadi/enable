import React, { useState } from 'react';
import './ErrorBadRequest.css';

function ErrorBadRequest(props) {


  return (
    <>
      <div class="error-page">
        <div>
          <h1 data-h1="403">403</h1>
          <p data-p="Do Not Have Access To This Page">Do Not Have Access To This Page</p>
        </div>
      </div>
      <div id="particles-js"></div>
    </>
  )
}

export default ErrorBadRequest;
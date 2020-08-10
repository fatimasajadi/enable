import React from 'react';
import ReactLoading from 'react-loading';

function Loading({ type, color }) {
  return (
    <ReactLoading type={type} color={color} height={'15%'} width={'15%'} color="#42f572" type='bubbles' />
  )

}

;

export default Loading;
import React from 'react';

export function Rating(props) {
  const onChange = (i) => {
    if (props.onChange) {
      props.onChange(i)
    }
  }

  return (
    <div className='star'>
      {
        Array.from({ length: props.value }).map((_, i) => (
          <i onClick={() => onChange(i + 1)} key={i} class="fa fa-star" aria-hidden="true" />
        ))
      }
      {
        Array.from({ length: 5 - props.value }).map((_, i) => (
          <i onClick={() => onChange(props.value + i + 1)} key={`o-${i}`} class="fa fa-star-o" aria-hidden="true" />
        ))
      }
    </div>
  );
}

export default Rating;
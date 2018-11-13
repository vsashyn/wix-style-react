import React from 'react';

export const DarkBackground = (
  {children} //eslint-disable-line
) => (
  <div
    style={{
      background: 'rgb(91, 127, 164)',
      padding: '2px'
    }}
    >
    {children}
  </div>
);

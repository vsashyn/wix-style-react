import React from 'react';

import * as Icons from 'wix-style-react/new-icons';

export default Object.values(Icons).map(icon => ({
  label: icon.displayName,
  value: React.createElement(icon)
}));

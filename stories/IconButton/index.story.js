import React from 'react';
import IconButton from 'wix-style-react/IconButton';
import {storySettings} from './storySettings';
import More from 'wix-style-react/new-icons/More';

import icons from './icons-for-story';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: IconButton,
  componentPath: '../../src/IconButton',

  componentProps: {
    children: <More/>,
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    disabled: false
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    children: icons
  }
};

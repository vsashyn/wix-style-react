import React from 'react';
import TextButton from 'wix-style-react/TextButton';
import {storySettings} from './storySettings';
import icons from './icons-for-story';

import TextButtonStory from './examples';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: TextButton,
  componentPath: '../../src/TextButton',

  componentProps: {
    children: 'Text button',
    skin: 'standard',
    underline: 'none',
    weight: 'thin',
    size: 'medium',
    disabled: false
  },
  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons
  },

  examples: <TextButtonStory/>
};

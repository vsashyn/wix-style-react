import React from 'react';
import Collapse from '../src/Collapse';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';

const exampleChildren = [
  {label: 'Simple text', value: 'Lorem perferendis sapiente quas facilis!'},
  {
    label: 'FormField with Input',
    value: (
      <FormField label="Enter your name">
        <Input/>
      </FormField>
    )
  }
];

export default {
  category: 'Components',
  storyName: 'Collapse',
  component: Collapse,
  componentPath: '../src/Collapse',

  componentProps: {children: exampleChildren[0].value, open: true},
  exampleProps: {children: exampleChildren}
};

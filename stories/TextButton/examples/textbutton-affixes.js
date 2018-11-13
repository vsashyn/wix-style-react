import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

export default () => (
  <React.Fragment>
    <TextButton prefixIcon={<ChevronDown/>}>prefix</TextButton>
    <TextButton suffixIcon={<ChevronDown/>}>suffix</TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    Suffix and prefix icons can be added to a button by setting
    <code>prefixIcon</code> or <code>suffixIcon</code> props.
  </div>
);

export const TextButtonAffixes = () => (
  <CodeShowcase
    title="TextButton - prefixIcon & suffixIcon"
    code={example}
    description={description}
    >
    <TextButton prefixIcon={<ChevronDown/>}>prefix</TextButton>
    <TextButton suffixIcon={<ChevronDown/>}>suffix</TextButton>
  </CodeShowcase>
);

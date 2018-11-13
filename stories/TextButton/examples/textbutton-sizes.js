import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

export default () => (
  <React.Fragment>
    <TextButton prefixIcon={<ChevronDown/>} size="small">
      small
    </TextButton>
    <TextButton prefixIcon={<ChevronDown/>} size="medium">
      medium
    </TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    Text Button supports <code>small</code> and <code>medium</code> sizes. The
    default value is <code>medium</code>.
  </div>
);

export const TextButtonSizes = () => (
  <CodeShowcase
    title="TextButton - size"
    code={example}
    description={description}
    >
    <TextButton prefixIcon={<ChevronDown/>} size="small">
      small
    </TextButton>
    <TextButton prefixIcon={<ChevronDown/>} size="medium">
      medium
    </TextButton>
  </CodeShowcase>
);

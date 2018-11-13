import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';

const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <React.Fragment>
    <TextButton>thin</TextButton>
    <TextButton weight="normal">normal</TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    Text Button supports <code>thin</code> and <code>normal</code> weight. The
    default value is <code>thin</code>.
  </div>
);

export const TextButtonWeights = () => (
  <CodeShowcase
    title="TextButton - weight"
    code={example}
    description={description}
    >
    <TextButton>thin</TextButton>
    <TextButton weight="normal">normal</TextButton>
  </CodeShowcase>
);

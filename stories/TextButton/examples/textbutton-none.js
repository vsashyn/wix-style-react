import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';
import {DarkBackground} from './utils';

export const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <React.Fragment>
    <TextButton>standard</TextButton>
    <TextButton skin="light">light</TextButton>
    <TextButton skin="premium">premium</TextButton>
    <TextButton skin="dark">dark</TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    Primary skins <code>standard</code>,<code>light</code>,<code>premium</code>
    and <code>dark</code>.
  </div>
);

export const TextButtonNone = () => (
  <CodeShowcase
    title="TextButton - underline:none (default)"
    code={example}
    description={description}
    >
    <TextButton>standard</TextButton>

    <DarkBackground>
      <TextButton skin="light">light</TextButton>
    </DarkBackground>

    <TextButton skin="premium">premium</TextButton>
    <TextButton skin="dark">dark</TextButton>
  </CodeShowcase>
);

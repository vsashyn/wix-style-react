import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';
import {DarkBackground} from './utils';

export const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <React.Fragment>
    <TextButton underline="always">standard</TextButton>
    <TextButton skin="light" underline="always">
      light
    </TextButton>
    <TextButton skin="premium" underline="always">
      premium
    </TextButton>
    <TextButton skin="dark" underline="always">
      dark
    </TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    Underline skins <code>standard</code>,<code>light</code>,
    <code>premium</code> and <code>dark</code>.
  </div>
);

export const TextButtonUnderline = () => (
  <CodeShowcase
    title="TextButton - underline:always"
    code={example}
    description={description}
    >
    <TextButton underline="always">standard</TextButton>

    <DarkBackground>
      <TextButton skin="light" underline="always">
        light
      </TextButton>
    </DarkBackground>

    <TextButton skin="premium" underline="always">
      premium
    </TextButton>
    <TextButton skin="dark" underline="always">
      dark
    </TextButton>
  </CodeShowcase>
);

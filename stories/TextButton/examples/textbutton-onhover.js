import React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import TextButton from 'wix-style-react/TextButton';
import {DarkBackground} from './utils';

export const example = `import React from "react";
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <React.Fragment>
    <TextButton underline="onHover">standard</TextButton>
    <TextButton skin="light" underline="onHover">
      light
    </TextButton>
    <TextButton skin="premium" underline="onHover">
      premium
    </TextButton>
    <TextButton skin="dark" underline="onHover">
      dark
    </TextButton>
  </React.Fragment>
);`;

const description = (
  <div>
    OnHover skins <code>standard</code>,<code>light</code>,<code>premium</code>{' '}
    and <code>dark</code>.
  </div>
);

export const TextButtonOnHover = () => (
  <CodeShowcase
    title="TextButton - underline:onHover"
    code={example}
    description={description}
    >
    <TextButton underline="onHover">standard</TextButton>

    <DarkBackground>
      <TextButton skin="light" underline="onHover">
        light
      </TextButton>
    </DarkBackground>

    <TextButton skin="premium" underline="onHover">
      premium
    </TextButton>
    <TextButton skin="dark" underline="onHover">
      dark
    </TextButton>
  </CodeShowcase>
);

import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import {createStoryUrl} from '../../test/utils/storybook-helpers';
import {storySettings} from '../../stories/TextButton/storySettings';

describe('TextButton', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  beforeEach(() => {
    return autoExampleDriver.remount();
  });

  describe(`'skin' prop`, () => {
    ['', 'light', 'premium', 'dark'].map(skin =>
      eyes.it(`should render with value ${skin}`, async () => {
        await autoExampleDriver.setProps({skin});
      })
    );
  });

  describe(`'underline' prop`, () => {
    ['', 'onHover', 'underline'].map(underline =>
      eyes.it(`should render with theme ${underline}`, async () => {
        await autoExampleDriver.setProps({underline});
      })
    );
  });

  describe(`'size' prop`, () => {
    ['', 'small'].map(size =>
      eyes.it(`should render with ${size} icon`, async () => {
        await autoExampleDriver.setProps({size});
      })
    );
  });

  describe(`'weight' prop`, () => {
    ['', 'normal'].map(weight =>
      eyes.it(`should render with theme ${weight}`, async () => {
        await autoExampleDriver.setProps({disabled: true, weight});
      })
    );
  });
});

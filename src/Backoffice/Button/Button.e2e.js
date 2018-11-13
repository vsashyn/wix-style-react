import React from 'react';
import eyes from 'eyes.it';
import queryString from 'query-string';
import {buttonTestkitFactory} from '../../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {runFocusTests} from '../../common/Focusable/FocusableTestsE2E';
import {TESTS_PREFIX} from '../../../stories/storiesHierarchy';

const NO_DESCRIPTION = '';

describe('Backoffice Button', () => {
  const storyUrl = getStoryUrl('5. Buttons', '5.1 Standard');
  const driver = buttonTestkitFactory({dataHook: 'storybook-button'});

  // Specific as opposed to 'Generic' tests like the Focusable tests.
  describe(NO_DESCRIPTION, () => {
    beforeEach(async () => {
      // TODO: We do browser.get() before EACH test in order to reset the focus.
      // implmement a generic solution in AutoExampleDriver that will do
      // propper reset of the focus, so we don't have to get the page,
      // and thus the test will run faster.
      await browser.get(storyUrl);
      await waitForVisibilityOf(driver.element(), 'Cannot find Button');
    });

    afterEach(() => autoExampleDriver.reset());
    eyes.it(
      'should be in initial state when renders with default',
      async () => {
        expect(await driver.isButtonDisabled()).toBe(false, 'isButtonDisabled');
        expect(await driver.isFocused()).toBe(false, 'isFocused');
      }
    );

    eyes.it('should alert on click', async () => {
      await autoExampleDriver.setProps({
        onClick: () => window.alert('clicked') // eslint-disable-line no-alert
      });

      await driver.click();

      const alertDialog = browser.switchTo().alert();

      expect(await alertDialog.getText()).toBe('clicked');
      await alertDialog.dismiss();
    });

    eyes.it('should render disabled', async () => {
      await autoExampleDriver.setProps({disabled: true});
      expect(await driver.isButtonDisabled()).toBe(true);
    });

    eyes.it('should render prefix & sufix', async () => {
      await autoExampleDriver.setProps({
        prefixIcon: <div>prefix</div>,
        suffixIcon: <div>suffix</div>
      });
      expect(await driver.isPrefixIconExists()).toBe(true);
      expect(await driver.isSuffixIconExists()).toBe(true);
    });

    describe('FocusableDriver', () => {
      it('should be focused when clicked', async () => {
        await driver.click();
        expect(await driver.isFocused()).toBe(true);
      });
    });
  });

  describe('render variations', () => {
    ['x-small', 'small', 'medium', 'large', 'x-large'].forEach(height => {
      [false, true].forEach(hover => {
        const props = {height, hover};
        eyes.it(
          `should display all themes with props=${JSON.stringify(props)}`,
          async () => {
            const storyUrl = getStoryUrl(
              `${TESTS_PREFIX}/5. Buttons`,
              '5.0 ButtonLayout'
            );
            await browser.get(`${storyUrl}&${queryString.stringify(props)}`);
          }
        );
      });
    });
  });

  describe('Generic', () => {
    runFocusTests(driver, storyUrl);
  });
});

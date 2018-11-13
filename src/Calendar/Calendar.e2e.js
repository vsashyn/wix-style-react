import eyes from 'eyes.it';
import {calendarTestkitFactory, waitForVisibilityOf} from '../../testkit/protractor';
import {createStoryUrl} from '../../test/utils/storybook-helpers';
import {TESTS_PREFIX} from '../../stories/storiesHierarchy';

describe('Calendar', () => {
  const storyUrl = ({selectedDays}) => {
    const baseUrl = createStoryUrl({kind: `${TESTS_PREFIX}/3. Inputs/3.13 Calendar`, story: '1. selectedDays'});
    return `${baseUrl}&selectedDays=${JSON.stringify(selectedDays)})}`;
  };
  const dataHook = 'calendar';
  const driver = calendarTestkitFactory({dataHook});

  eyes.fit('should render with a selected day', async () => {
    await browser.get(storyUrl({selectedDays: JSON.stringify(new Date('2017/05/01'))}));
    await waitForVisibilityOf(driver.exists(), 'Cannot find Calendar');
  }, {enableSnapshotAtBrowserGet: false});

  eyes.it('should render with a selected range', async () => {
    await browser.get(storyUrl({
      selectedDays: {
        from: JSON.stringify(new Date('2017/05/02')),
        to: JSON.stringify(new Date('2017/05/06'))
      }}));
    await waitForVisibilityOf(driver.element(), 'Cannot find Calendar');
    expect(await driver.getSelectedDays()).toEqual(['1']);
  }, {enableSnapshotAtBrowserGet: false});
});

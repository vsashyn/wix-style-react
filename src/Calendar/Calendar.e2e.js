import eyes from 'eyes.it';
import {calendarTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Calendar', () => {
  const dataHook = 'calendar';
  const storyUrl = getStoryUrl('3. Inputs', '3.13 Calendar');
  const driver = calendarTestkitFactory({dataHook});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  beforeEach(() => {
    autoExampleDriver.reset();
  });

  describe('default', () => {
    eyes.it('should not break design', async () => {
      autoExampleDriver.setProps({value: new Date('2017/05/01')});
      expect(await driver.exists()).toBe(true);
      await eyes.checkWindow(dataHook);
    });
  });

  describe('selectedDays', () => {
    eyes.it('should work for a single date', async () => {
      autoExampleDriver.setProps({selectedDays: new Date('2017/05/01')});
      expect(await driver.exists()).toBe(true);
      expect(await driver.getSelectedDays()).toEqual(['1']);
      await eyes.checkWindow(dataHook);
    });
    
    // doesn't work because protractor fails to support {from:Date,to:Date} props
    /*eyes.it('should work for a date range', async () => {
      autoExampleDriver.setProps({selectedDays: {from: new Date('2017/05/02'), to: new Date('2017/05/06')}});
      expect(await driver.exists()).toBe(true);
      //expect(await driver.getSelectedDays()).toEqual(['1']);
      browser.sleep(100000);
      await eyes.checkWindow(dataHook);
    });*/
  });
});

import React from 'react';
//import ReactTestUtils from 'react-dom/test-utils';
import calendarDriverFactory from './Calendar.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
//import {checkboxTestkitFactory} from '../../testkit';
import Calendar from './Calendar';
//import {mount} from 'enzyme';

const originalConsoleWarn = console.warn; // eslint-disable-line no-console
const createDriver = createDriverFactory(calendarDriverFactory);

describe('Calendar', () => {
  describe('Old prop deprecation', () => {
    beforeEach(() => {
      console.warn = jest.fn(); // eslint-disable-line no-console
    });

    it('shows no deprecationLog when neither value nor onChange is used', () => {
      const driver = createDriver(
        <Calendar/>
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(0); // eslint-disable-line no-console
    });

    it('should show deprecationLog when the value prop is used', () => {
      const driver = createDriver(
        <Calendar
          value={new Date()}
          />
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(1); // eslint-disable-line no-console
    });

    it('should show deprecationLog when the onChange prop is used', () => {
      const driver = createDriver(
        <Calendar
          onChange={() => {}}
          />
      );
      expect(driver.exists()).toBeTruthy();
      expect(console.warn.mock.calls.length).toEqual(1); // eslint-disable-line no-console
    });

    afterAll(() => {
      console.warn = originalConsoleWarn; // eslint-disable-line no-console
    });
  });

  describe('selectedDays prop', () => {
    it('overrides the value prop', () => {
      const value = new Date(2018, 10, 1);
      const selectedDays = new Date(2018, 9, 1);

      const driver = createDriver(
        <Calendar
          value={value}
          selectedDays={selectedDays}
          />
      );
      expect(driver.getMonthCaption()).toEqual('October');
    });
  });
/*
  describe('clicking on a day', () => {
    let onSelectedDaysChange;

    beforeEach(() => {
      onSelectedDaysChange = jest.fn();
    });

    it('with selectionMode=\'day\' will select that day', () => {
      const driver = createDriver(
        <Calendar
          selectedDays={selectedDays}
          onSelectedDaysChange={onSelectedDaysChange}
          />
      );

  //    const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={noop} disabled/>);
  //    inputDriver.trigger('click');

      console.log('-------------', onSelectedDaysChange.mock.calls)
      expect(onSelectedDaysChange.mock.calls.length).toEqual(1);
    })

  });*/
});

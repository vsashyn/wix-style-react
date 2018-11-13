import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import badgeSelectPrivateDriverFactory from './BadgeSelect.driver.private';
import BadgeSelect from './BadgeSelect';
import {SKIN, SIZE, TYPE} from 'wix-ui-backoffice/dist/src/components/Badge/constants';
import {mount} from 'enzyme';
import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils/enzyme';


describe('BadgeSelect', () => {
  const createDriver = createDriverFactory(badgeSelectPrivateDriverFactory);
  const badgeSelectEnzymeDriver = enzymeTestkitFactoryCreator(badgeSelectPrivateDriverFactory);
  const initialOptionId = 0;
  const options = Object.values(SKIN).map((skin, id) => ({
    id: id.toString(),
    skin,
    text: skin
  }));

  function createComponent(props = {}) {

    const combinedProps = {
      options,
      selectedId: initialOptionId.toString(),
      ...props
    };

    return createDriver(
      <BadgeSelect {...combinedProps}/>
    );
  }

  it('should have a badge and hidden options by default', () => {
    const {driver, badgeDriver} = createComponent();
    expect(driver.exists()).toBeTruthy();
    expect(driver.isDropdownShown()).toBeFalsy();
    expect(badgeDriver.exists()).toBeTruthy();
  });

  it('should show badge with initial selected skin and text', () => {
    const {badgeDriver} = createComponent();
    expect(badgeDriver.getSkin()).toBe(options[initialOptionId].skin);
    expect(badgeDriver.text()).toBe(options[initialOptionId].text);
  });

  it('should show badge with correct general props as default', () => {
    const {badgeDriver} = createComponent();
    expect(badgeDriver.getType()).toBe(TYPE.solid);
    expect(badgeDriver.getSize()).toBe(SIZE.medium);
    expect(badgeDriver.isUppercase()).toBe(true);
  });

  it('should render badge with a suffix icon', () => {
    const {badgeDriver} = createComponent();
    expect(badgeDriver.getSuffixIcon()).toBe.defined;
  });

  it('should show badge with props given', () => {
    const {badgeDriver} = createComponent({type: TYPE.outlined, size: SIZE.small, uppercase: false});
    expect(badgeDriver.getType()).toBe(TYPE.outlined);
    expect(badgeDriver.getSize()).toBe(SIZE.small);
    expect(badgeDriver.isUppercase()).toBe(false);
  });

  it('should show badge selector when badge is clicked', () => {
    const {driver} = createComponent();
    driver.click();
    expect(driver.isDropdownShown()).toBeTruthy();
  });

  it('should hide options on selection', () => {
    const {driver} = createComponent();
    driver.click();
    driver.clickAtOption(2);
    expect(driver.isDropdownShown()).toBeFalsy();
  });

  it('should hide options on outside click', () => {
    const {driver} = createComponent();
    driver.click();
    expect(driver.isDropdownShown()).toBeTruthy();
    driver.clickOutside();
    expect(driver.isDropdownShown()).toBeFalsy();
  });

  it('should call onSelect when an option is selected', () => {
    const onSelect = jest.fn();
    const selectedIndex = 3;
    const {driver} = createComponent({onSelect});
    driver.click();
    driver.clickAtOption(selectedIndex);
    expect(onSelect).toBeCalledWith(options[selectedIndex]);
  });

  describe('uncontrolled mode', () => {
    it('should pick the first option if no selectedId given', () => {
      const uncontrolledProps = {selectedId: undefined};
      const {badgeDriver} = createComponent(uncontrolledProps);

      expect(badgeDriver.getSkin()).toBe(options[0].skin);
      expect(badgeDriver.text()).toBe(options[0].text);
    });

    it('should change badge after an option is selected', () => {
      const uncontrolledProps = {selectedId: undefined};
      const {driver, badgeDriver} = createComponent(uncontrolledProps);
      const selectedIndex = 3;

      driver.click();
      driver.clickAtOption(selectedIndex);
      expect(badgeDriver.getSkin()).toBe(options[selectedIndex].skin);
      expect(badgeDriver.text()).toBe(options[selectedIndex].text);
    });
  });

  describe('controlled mode', () => {
    it('should not change badge after an option is selected', () => {
      const {driver, badgeDriver} = createComponent();
      const selectedIndex = 3;

      driver.click();
      driver.clickAtOption(selectedIndex);
      expect(badgeDriver.getSkin()).toBe(options[0].skin);
      expect(badgeDriver.text()).toBe(options[0].text);
    });

    it('should change badge only on selectedIndex change', () => {
      const dataHook = 'badge-select';
      const wrapper = mount(<BadgeSelect selectedId={'0'} dataHook={dataHook} options={options}/>);

      const {driver, badgeDriver} = badgeSelectEnzymeDriver({wrapper, dataHook});
      const selectedIndex = 3;

      driver.click();
      driver.clickAtOption(selectedIndex);

      wrapper.setProps({selectedId: `${selectedIndex}`});

      expect(badgeDriver.getSkin()).toBe(options[selectedIndex].skin);
      expect(badgeDriver.text()).toBe(options[selectedIndex].text);

    });
  });
});

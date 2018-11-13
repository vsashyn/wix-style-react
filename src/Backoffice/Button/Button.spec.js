import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import buttonDriverFactory from './Button.driver';
import Button from './Button';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {buttonTestkitFactory} from '../../../testkit';
import {buttonTestkitFactory as enzymeButtonTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Button', () => {
  const createDriver = createDriverFactory(buttonDriverFactory);

  it('should click a button', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick}/>);

    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick} disabled/>);

    driver.click();
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should not call focusableOnFocus when disabled', () => {
    const focus = jest.fn();
    const driver = createDriver(<Button focusableOnFocus={focus} disabled/>);

    driver.focus();
    expect(focus).toHaveBeenCalledTimes(0);
  });

  it('should not call focusableOnBlur when disabled', () => {
    const blur = jest.fn();
    const driver = createDriver(<Button focusableOnBlur={blur} disabled/>);

    driver.blur();
    expect(blur).toHaveBeenCalledTimes(0);
  });

  it('should call onMouseEnter when disabled', () => {
    const mouseEnter = jest.fn();
    const driver = createDriver(<Button onMouseEnter={mouseEnter} disabled/>);

    driver.mouseEnter();
    expect(mouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when disabled', () => {
    const mouseLeave = jest.fn();
    const driver = createDriver(<Button onMouseLeave={mouseLeave} disabled/>);

    driver.mouseLeave();
    expect(mouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should get disabled class', () => {
    const driver = createDriver(<Button disabled/>);

    expect(driver.isButtonDisabled()).toBe(true);
  });

  it('should render children', () => {
    const children = '<div>123</div>';
    const driver = createDriver(<Button>{children}</Button>);

    expect(driver.getButtonTextContent()).toBe(children);
  });

  it('should have a prefixIcon', () => {
    const driver = createDriver(<Button prefixIcon={<div/>}/>);

    expect(driver.isSuffixIconExists()).toBeFalsy();
    expect(driver.isPrefixIconExists()).toBeTruthy();
  });

  it('should have a suffixIcon', () => {
    const driver = createDriver(<Button suffixIcon={<div/>}/>);

    expect(driver.isPrefixIconExists()).toBeFalsy();
    expect(driver.isSuffixIconExists()).toBeTruthy();
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = div.appendChild(
      ReactTestUtils.renderIntoDocument(
        <div>
          <Button onClick={onClick} dataHook={dataHook}/>
        </div>
      )
    );
    const buttonTestkit = buttonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} dataHook={dataHook}/>);
    const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});

import React from 'react';

import {ReactDOMTestContainer} from '../../test/utils/dom-test-container';
import {textButtonPrivateDriverFactory} from './TextButton.driver.private';

import TextButton from './TextButton';

describe('TextButton', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(textButtonPrivateDriverFactory);

  it.skip('should have correct displayName', () => {
    const driver = createDriver(<TextButton dataHook="textbutton-dataHook"/>);
    expect(driver.name()).toEqual('TextButton');
  });

  describe(`'onClick' prop`, () => {
    it('should be called on click', async () => {
      const onClick = jest.fn();
      const driver = createDriver(<TextButton onClick={onClick}/>);
      await driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call 'onClick' when 'disabled'`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<TextButton onClick={onClick} disabled/>);
      await driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe(`'children' prop`, () => {
    it('should render text', async () => {
      const text = 'button';
      const driver = createDriver(<TextButton children={text}/>);
      expect(await driver.getButtonTextContent()).toBe(text);
    });
  });

  describe(`'suffixIcon' and 'prefixIcon' props`, () => {
    const suffix = <div data-hook="suffix">suffix</div>;
    const prefix = <div data-hook="prefix">prefix</div>;

    it(`should render 'suffix' when given`, async () => {
      const driver = createDriver(<TextButton suffixIcon={suffix}/>);
      expect(await driver.suffixExists()).toBeTruthy();
      expect(await driver.prefixExists()).toBeFalsy();
    });

    it(`should render 'prefix' when given`, async () => {
      const driver = createDriver(<TextButton prefixIcon={prefix}/>);
      expect(await driver.prefixExists()).toBeTruthy();
      expect(await driver.suffixExists()).toBeFalsy();
    });
  });
});

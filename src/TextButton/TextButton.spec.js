import React from 'react';

import {ReactDOMTestContainer} from '../../test/utils/dom-test-container';
import {textButtonDriverFactory} from './TextButton.driver';

import TextButton from './TextButton';

describe('TextButton', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(textButtonDriverFactory);

  it.skip('should have correct displayName', () => {
    const driver = createDriver(<TextButton/>);
    expect(driver.name()).toEqual('TextButton');
  });
});

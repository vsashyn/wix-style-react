import React from 'react';
import selectorDriverFactory from './Selector.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import Selector from './Selector';

describe('Selector', () => {
  const createDriver = createDriverFactory(selectorDriverFactory);

  const defaultProps = {
    id: 1,
    title: 'title'
  };

  it('should be unchecked by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.isChecked()).toBeFalsy();
  });

  it('should not render the subtitle by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.subtitleTextDriver().exists()).toBe(false);
  });

  it('should not render the extra node', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.hasExtraNode()).toBe(false);
  });

  it('should render the title', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.titleTextDriver().getText()).toBe(defaultProps.title);
  });

  it('should render the subtitle', () => {
    const props = {...defaultProps, ...{subtitle: 'sub title'}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.subtitleTextDriver().getText()).toBe('sub title');
  });

  it('should render the extra node', () => {
    const props = {...defaultProps, ...{extraNode: 'extra text'}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.hasExtraNode()).toBe(true);
    expect(driver.getExtraNode().textContent).toBe('extra text');
  });

  it('should not render the image by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.hasImage()).toBe(false);
  });

  it('should render the image', () => {
    const driver = createDriver(
      <Selector {...defaultProps} image={<img src="img.png"/>}/>
    );
    expect(driver.hasImage()).toBe(true);
    expect(driver.getImage()).toBeInstanceOf(HTMLImageElement);
    expect(driver.getImage().src).toBe('img.png');
  });

  it('should render a radio toggle by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.toggleType()).toBe('radio');
  });

  it('should render a checkbox toggle', () => {
    const toggleType = 'checkbox';
    const props = {...defaultProps, ...{toggleType}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.toggleType()).toBe(toggleType);
  });

  it('should render a radio toggle', () => {
    const toggleType = 'radio';
    const props = {...defaultProps, ...{toggleType}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.toggleType()).toBe(toggleType);
  });

  it('should not propagate when selecting a disabled selector', () => {
    const onToggle = jest.fn();
    const toggleType = 'radio';
    const props = {...defaultProps, ...{toggleType}};
    const driver = createDriver(
      <Selector onToggle={onToggle} {...props} isDisabled/>
    );

    driver.toggle();

    expect(onToggle).not.toHaveBeenCalled();
  });

  describe('given image size', () => {
    const sizesAndTestkitMethods = [
      ['tiny', 'isImageTiny'],
      ['small', 'isImageSmall'],
      ['portrait', 'isImagePortrait'],
      ['large', 'isImageLarge'],
      ['cinema', 'isImageCinema']
    ];

    sizesAndTestkitMethods.forEach(([size, method]) => {
      it(`should set correct className for "${size}"`, () => {
        const driver = createDriver(
          <Selector
            {...{
              ...defaultProps,
              imageSize: size,
              image: <img src="img.png"/>
            }}
            />
        );

        expect(driver[method](size)).toBe(true);
      });
    });
  });
});

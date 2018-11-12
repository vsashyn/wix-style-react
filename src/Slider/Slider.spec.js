import React from 'react';
import Slider from './Slider';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import sliderDriverFactory from './Slider.driver';

describe('Slider', () => {
  const createDriver = createDriverFactory(sliderDriverFactory);
  let driver;

  it('should render slider', () => {
    const onChange = jest.fn(value => this.setState({value}));
    const props = {value: [3], min: 1, max: 10, onChange};

    driver = createDriver(<Slider {...props}/>);

    expect(driver.numOfSliderDots()).toBe(10);
    expect(driver.numOfSliderHandles()).toBe(1);
    expect(driver.isDotSelected(3)).toBe(true);
  });

  it('should render slider with multi-range', () => {
    const onChange = jest.fn(value => this.setState({value}));
    const props = {value: [3, 5, 7], min: 1, max: 10, onChange};

    driver = createDriver(<Slider {...props}/>);

    expect(driver.numOfSliderDots()).toBe(10);
    expect(driver.numOfSliderHandles()).toBe(3);

    props.value.forEach(selectedValue => {
      expect(driver.isDotSelected(selectedValue)).toBe(true);
    });
  });

  it('should show correct value on hover', () => {
    const onChange = jest.fn(value => this.setState({value}));
    const props = {value: [3, 5, 7], min: 1, max: 10, onChange};

    driver = createDriver(<Slider {...props}/>);

    driver.hoverHandle({handleIndex: 0});

    expect(driver.getToolTipValue()).toBe(`${props.value[0]}`);

    driver.unHoverHandle({handleIndex: 0});
    driver.hoverHandle({handleIndex: 1});

    expect(driver.getToolTipValue()).toBe(`${props.value[1]}`);
  });

  it('should not display tooltip if `displayTooltip` is set to false', () => {
    const onChange = jest.fn(value => this.setState({value}));
    const props = {value: [4], displayTooltip: false, onChange};

    driver = createDriver(<Slider {...props}/>);

    driver.hoverHandle({handleIndex: 0});

    expect(driver.getToolTipValue()).toBeFalsy();

    driver.unHoverHandle({handleIndex: 0});
  });
});

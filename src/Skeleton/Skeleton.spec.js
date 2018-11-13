import React from 'react';
import Skeleton from './Skeleton';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {skeletonDriverFactory} from './Skeleton.driver';

const content = [
  {type: 'line', size: 'small'},
  {type: 'line', size: 'large'},
  {type: 'line', size: 'medium'}
];

describe('Skeleton', () => {
  const createDriver = createDriverFactory(skeletonDriverFactory);

  const createComponent = props => {
    return createDriver(<Skeleton {...props}/>);
  };

  let driver;

  describe('with default props', () => {
    beforeEach(() => {
      driver = createComponent({content});
    });

    it('should have 3 placeholder lines', () => {
      expect(driver.lines().length).toBe(content.length);
    });

    it('should give the \'first\' class to the first element', () => {
      expect(driver.isFirstLine(driver.lines()[0])).toBe(true);
    });

    it('should have medium spacing by default', () => {
      expect(driver.inMediumSpacing(driver.lines()[0])).toBe(true);
    });

    content.map(obj => obj.size).forEach((size, index) => {
      it(`should have a line with the ${size} class`, () => {
        const chunk = driver.chunks()[index];
        expect(driver[`${size}Size`](chunk)).toBe(true);
      });

      it(`should have a concealer with the ${size} class`, () => {
        const concealer = driver.concealers()[index];
        expect(driver[`${size}Size`](concealer)).toBe(true);
      });
    });
  });

  describe('in middle alignment', () => {
    beforeEach(() => {
      driver = createComponent({content, alignment: 'middle'});
    });

    it('should be aligned to the middle', () => {
      expect(driver.inMiddleAlignment(driver.lines()[0])).toBe(true);
    });

    it('should have double the amount of concealers, but same number of lines', () => {
      expect(driver.chunks().length).toBe(content.length);
      expect(driver.concealers().length).toBe(2 * content.length);
    });
  });
});

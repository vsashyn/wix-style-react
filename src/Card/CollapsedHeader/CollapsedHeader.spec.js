import React from 'react';
import collapsedHeaderDriverFactory from './CollapsedHeader.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import CollapsedHeader from './CollapsedHeader';

import {requestAnimationFramePolyfill} from '../../../testkit/polyfills';

const dataHook = 'content';
const content = <div data-hook={dataHook}>Some Content</div>;

describe('CollapsedHeader', () => {
  const createDriver = createDriverFactory(collapsedHeaderDriverFactory);
  requestAnimationFramePolyfill.install();

  it('should have a title', () => {
    const driver = createDriver(
      <CollapsedHeader title="Header Title">
        <div/>
      </CollapsedHeader>
    );
    expect(driver.title()).toBe('Header Title');
  });

  it('should have a subtitle', () => {
    const driver = createDriver(
      <CollapsedHeader title="Header Title" subtitle="Header Subtitle">
        <div/>
      </CollapsedHeader>
    );
    expect(driver.subtitle()).toBe('Header Subtitle');
  });

  it('should show content', () => {
    const driver = createDriver(
      <CollapsedHeader title="Header Title">{content}</CollapsedHeader>
    );

    expect(driver.findByDatahook('content').innerHTML).toBe('Some Content');
  });

  it('should hide content', () => {
    const driver = createDriver(
      <CollapsedHeader collapsed title="Header Title">
        {content}
      </CollapsedHeader>
    );

    expect(driver.findByDatahook(dataHook)).toBe(null);
  });

  it('should call with collapse status', () => {
    const onCollapsedChange = jest.fn();
    const driver = createDriver(
      <CollapsedHeader
        title="Header Title"
        onCollapsedChange={onCollapsedChange}
        >
        {content}
      </CollapsedHeader>
    );

    driver.click();
    expect(onCollapsedChange).toBeCalledWith(true);

    driver.click();
    expect(onCollapsedChange).toBeCalledWith(false);
  });

  it('should hide content on collapse', () => {
    const driver = createDriver(
      <CollapsedHeader title="Header Title">{content}</CollapsedHeader>
    );

    driver.click();

    expect(driver.findByDatahook(dataHook)).toBe(null);
  });

  it('should show content on collapse', () => {
    const driver = createDriver(
      <CollapsedHeader collapsed title="Header Title">
        {content}
      </CollapsedHeader>
    );

    driver.click();

    expect(driver.findByDatahook(dataHook).innerHTML).toBe('Some Content');
  });

  describe('controlled collapse', () => {
    it('should call with collapsed status', () => {
      const onCollapsedChange = jest.fn();
      const driver = createDriver(
        <CollapsedHeader
          title="Header Title"
          controlled
          onCollapsedChange={onCollapsedChange}
          >
          {content}
        </CollapsedHeader>
      );

      driver.click();
      expect(onCollapsedChange).toBeCalledWith(false);
    });

    it('should not hide content when controlled', () => {
      const driver = createDriver(
        <CollapsedHeader
          title="Header Title"
          controlled
          onCollapsedChange={jest.fn()}
          >
          {content}
        </CollapsedHeader>
      );

      driver.click();

      expect(driver.findByDatahook(dataHook).innerHTML).toBe('Some Content');
    });
  });
});

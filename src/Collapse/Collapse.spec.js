import React from 'react';
import {mount} from 'enzyme';

import Collapse from './';

describe('Collapse', () => {
  it('should render children', () => {
    const wrapper = mount(<Collapse children="hello"/>);
    expect(wrapper.text()).toEqual('hello');
  });

  describe('`open` prop', () => {
    it('should not render children when false', () => {
      const wrapper = mount(<Collapse open={false} children="hello"/>);
      expect(wrapper.children().text()).toEqual(null);
    });
  });

  describe('`dataHook` prop', () => {
    it('should be passed to children', () => {
      const hookForRoot = 'I\'m Hooked!';
      const hookOfChild = 'Leave britney alone!';

      const wrapper = mount(
        <Collapse
          dataHook={hookForRoot}
          children={<div data-hook={hookOfChild}>arbitrary content</div>}
          />
      );

      expect(wrapper.children().prop('data-hook')).toEqual(hookForRoot);
      expect(wrapper.find(`[data-hook="${hookOfChild}"]`).exists()).toBe(true);
    });
  });
});

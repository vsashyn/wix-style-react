import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
const CollapsedHeaderDriverFactory = ({element, wrapper, component}) => {
  const title = element.querySelector('[data-hook="title"]');
  const subtitle = element.querySelector('[data-hook="subtitle"]');

  return {
    exists: () => !!element,
    title: () => title && title.innerHTML,
    subtitle: () => subtitle && subtitle.innerHTML,
    element: () => element,
    click: () => ReactTestUtils.Simulate.click(title),
    findByDatahook: dataHook =>
      element.querySelector(`[data-hook="${dataHook}"]`),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(
        component,
        Object.assign({}, component.props, props),
        ...(component.props.children || [])
      );
      ReactDOM.render(
        <div ref={r => (element = r)}>{ClonedWithProps}</div>,
        wrapper
      );
    }
  };
};

export default CollapsedHeaderDriverFactory;

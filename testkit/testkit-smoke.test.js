import React from 'react';
import {mount} from 'enzyme';
import path from 'path';

import {
  isTestkitExists,
  isEnzymeTestkitExists
} from '../test/utils/testkit-sanity';
import importAllComponents from '../test/utils/import-all-components';

import * as reactTestUtilsTestkitFactories from './index';
import * as enzymeTestkitFactories from './enzyme';

/**
 * The following list ignores specified components and skip testkit tests for them.
 * Reason is that some of them are not meant to have testkits, some are failing due to missing configuration (e.g.
 * required initial props) or other reasons.
 *
 * Goal should be to reduce this list to minimum, or, ideally, get rid of it entirely.
 */
const FAILING_COMPONENTS = [
  'AutoCompleteComposite',
  'BadgeSelectItemBuilder',
  'ButtonLayout',
  'ButtonWithOptions',
  'CalendarPanel',
  'Card',
  'CloseButton',
  'ColorPicker', // missing testkit for enzyme
  'Composite',
  'DataTable',
  'DatePicker',
  'DragAndDrop',
  'DragDropContextProvider',
  'DropdownComposite',
  'EndorseContentLayout',
  'FloatingHelper',
  'FullTextView',
  'GoogleAddressInput',
  'GoogleAddressInputWithLabel',
  'Grid', // Component has no testkit
  'HBox', // Component has no testkit
  'IconWithOptions',
  'Layout',
  'MessageBox',
  'Modal',
  'ModalSelectorLayout',
  'MultiSelect',
  'MultiSelectCheckbox',
  'MultiSelectComposite',
  'Notification',
  'Page',
  'PageHeader',
  'PopoverMenuItem',
  'Range',
  'RichTextArea',
  'RichTextAreaComposite',
  'SideMenuDrill',
  'Table',
  'TableToolbar',
  'Tabs',
  'TextArea',
  'TextField',
  'Tooltip',
  'VBox' // Component has no testkit
];

/**
 * Most of our components have required props and fail if used simply as <Component/>
 *
 * This object specifies those props so that `testkit.exists` can pass
 */
const REQUIRED_PROPS = {
  Tag: {
    useOldMargins: false,
    id: 'hello',
    children: 'a'
  },
  ImageViewer: {
    imageUrl: ''
  },
  FormField: {
    children: <div/>
  },
  BadgeSelect: {
    options: [{id: '0', skin: 'general', text: 'general'}],
    selectedId: '0'
  },
  Breadcrumbs: {
    items: [{id: 0, value: 'Option 1'}, {id: 1, value: 'Option 2'}]
  },
  Calendar: {
    onChange: () => {}
  },

  Slider: {
    onChange: () => {}
  },
  Selector: {
    id: 1,
    title: 'title'
  },
  StatsWidget: {
    title: 'test title'
  }
};

const cwd = path.resolve(__dirname, '..', 'src');
const lowerFirst = a =>
  a
    .charAt(0)
    .toLowerCase()
    .concat(a.slice(1));

const AllComponents = importAllComponents({
  cwd,
  ignore: FAILING_COMPONENTS
});

describe('ReactTestUtils testkits', () => {
  Object.entries(AllComponents).map(([name, component]) =>
    it(`${name} should have ReactTestUtils testkit`, () => {
      expect(
        isTestkitExists(
          React.createElement(component, REQUIRED_PROPS[name] || {}),
          reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`]
        )
      );
    })
  );
});

describe('Enzyme testkits', () => {
  Object.entries(AllComponents).map(([name, component]) =>
    it(`${name} should have enzyme testkit`, () => {
      expect(
        isEnzymeTestkitExists(
          React.createElement(component, REQUIRED_PROPS[name] || {}),
          enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
          mount
        )
      );
    })
  );
});

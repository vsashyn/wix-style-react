import React from 'react';
import {storiesOf} from '@storybook/react';

import AutoDocs from 'wix-storybook-utils/AutoDocs';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import StatsWidgetSource from '!raw-loader!../../src/StatsWidget/StatsWidget';

import ExampleStatsWidgetStandard from './ExampleStatsWidgetStandard';
import ExampleStatsWidgetStandardRaw from '!raw-loader!./ExampleStatsWidgetStandard';

import ExampleStatsWidgetWithPercents from './ExampleStatsWidgetWithPercents';
import ExampleStatsWidgetWithPercentsRaw from '!raw-loader!./ExampleStatsWidgetWithPercents';

import ExampleStatsWidgetWithInvertPercentColor from './ExampleStatsWidgetWithInvertPercentColor';
import ExampleStatsWidgetWithInvertPercentColorRaw from '!raw-loader!./ExampleStatsWidgetWithInvertPercentColor';

import ExampleStatsWidgetWithFilters from './ExampleStatsWidgetWithFilters';
import ExampleStatsWidgetWithFiltersRaw from '!raw-loader!./ExampleStatsWidgetWithFilters';

import ExampleStatsWidgetEmptyState from './ExampleStatsWidgetEmptyState';
import ExampleStatsWidgetEmptyStateRaw from '!raw-loader!./ExampleStatsWidgetEmptyState';

import ExampleStatsWidgetWithFilterWithNoBorder from './ExampleStatsWidgetWithFilterWithNoBorder';
import ExampleStatsWidgetWithFilterWithNoBorderRaw from '!raw-loader!./ExampleStatsWidgetWithFilterWithNoBorder';

import ReadmeTestkit from '../../src/StatsWidget/README.TESTKIT.md';


storiesOf('2. Layout', module)
  .add('2.7 StatsWidget', () => (
    <TabbedView tabs={['Usage', 'Testkit']}>
      <div>

        <AutoDocs source={StatsWidgetSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Stats widget" code={ExampleStatsWidgetStandardRaw}>
          <ExampleStatsWidgetStandard/>
        </CodeExample>
        <CodeExample title="Stats widget example with percents" code={ExampleStatsWidgetWithPercentsRaw}>
          <ExampleStatsWidgetWithPercents/>
        </CodeExample>
        <CodeExample title="Stats widget example with invert percent color" code={ExampleStatsWidgetWithInvertPercentColorRaw}>
          <ExampleStatsWidgetWithInvertPercentColor/>
        </CodeExample>
        <CodeExample title="Stats widget example with filter" code={ExampleStatsWidgetWithFilterWithNoBorderRaw}>
          <ExampleStatsWidgetWithFilterWithNoBorder/>
        </CodeExample>
        <CodeExample title="Stats widget example with multiple filters" code={ExampleStatsWidgetWithFiltersRaw}>
          <ExampleStatsWidgetWithFilters/>
        </CodeExample>
        <CodeExample title="Stats widget example with empty state" code={ExampleStatsWidgetEmptyStateRaw}>
          <ExampleStatsWidgetEmptyState/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestkit}/>
    </TabbedView>
  ));

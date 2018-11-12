/* eslint-disable no-console */
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import statsWidgetDriverFactory from './StatsWidget.driver';
import StatsWidget from './StatsWidget';
import ButtonWithOptions from '../../src/ButtonWithOptions';

describe('StatsWidget', () => {
  const createDriver = createDriverFactory(statsWidgetDriverFactory);

  const title = 'Stats Widget title';
  const statistics = [
    {
      title: '10$',
      subtitle: 'Revenue'
    },
    {
      title: '2',
      subtitle: 'Products'
    },
    {
      title: '1',
      subtitle: 'Transactions'
    },
    {
      title: '5',
      subtitle: 'Profit'
    },
    {
      title: '15',
      subtitle: 'Music'
    }
  ];

  const statisticsWithPercents = [
    {
      title: '10$',
      subtitle: 'Revenue',
      percent: 15
    },
    {
      title: '2',
      subtitle: 'Products',
      percent: -15
    },
    {
      title: '1',
      subtitle: 'Transactions',
      percent: 0
    }
  ];

  let driver;

  const stub = (console.error = jest.fn());

  function createComponent(props) {
    driver = createDriver(<StatsWidget {...props}/>);
  }

  let React;

  beforeEach(() => {
    React = require('react');
  });

  afterEach(() => {
    jest.resetModules();
    stub.mockReset();
  });

  it('should have correct title', () => {
    createComponent({title, statistics});
    expect(driver.titleText()).toBe(title);
  });

  it('should show statistics and not empty state', () => {
    createComponent({title, statistics});
    expect(driver.getStatisticTitle(0)).toBe(statistics[0].title);
    expect(driver.getStatisticSubTitle(0)).toBe(statistics[0].subtitle);
    expect(driver.isEmptyStateExists()).toBe(false);
  });

  it('should show empty state and not statistics', () => {
    createComponent({title, emptyState: <div>Empty</div>});
    expect(driver.isEmptyStateExists()).toBe(true);
    expect(driver.isStatisticsContentExists()).toBe(false);
  });

  it('should show abs of percentage', () => {
    createComponent({title, statistics: statisticsWithPercents});
    expect(driver.getStatisticPercentValue(0)).toBe(
      Math.abs(statisticsWithPercents[0].percent) + '%'
    );
    expect(driver.getStatisticPercentValue(1)).toBe(
      Math.abs(statisticsWithPercents[1].percent) + '%'
    );
  });

  it('should put proper classes to percentage according to value', () => {
    createComponent({title, statistics: statisticsWithPercents});

    expect(driver.getStatisticPercentClass(0)).toContain('isPositive');
    expect(driver.getStatisticPercentClass(1)).toContain('isNegative');

    expect(driver.getStatisticPercentClass(2)).not.toContain('isNegative');
    expect(driver.getStatisticPercentClass(2)).not.toContain('isPositive');
  });

  it('should show filter with ButtonWithOptions inside', () => {
    const children = (
      <StatsWidget.Filter
        selectedId={1}
        dataHook="stats-widget-filter"
        onSelect={stub}
        >
        <ButtonWithOptions.Button/>
        {[<ButtonWithOptions.Option key={1}>value</ButtonWithOptions.Option>]}
      </StatsWidget.Filter>
    );
    createComponent({title, statistics, children});
    expect(
      driver
        .getFilterDriver('stats-widget-filter')
        .dropdownLayoutDriver.exists()
    ).toBe(true);
  });

  it('filters should have selectable options', () => {
    const stub = jest.fn();
    const children = (
      <StatsWidget.Filter
        selectedId={1}
        dataHook="stats-widget-filter"
        onSelect={stub}
        >
        <ButtonWithOptions.Button/>
        {[<ButtonWithOptions.Option key={1}>value</ButtonWithOptions.Option>]}
      </StatsWidget.Filter>
    );
    createComponent({title, statistics, children});
    driver
      .getFilterDriver('stats-widget-filter')
      .dropdownLayoutDriver.clickAtOption(0);
    expect(stub).toHaveBeenCalled();
  });

  it('should show filters with option value specified', () => {
    const value = 'Last Week';
    const children = (
      <StatsWidget.Filter
        selectedId={1}
        dataHook="stats-widget-filter"
        onSelect={stub}
        >
        <ButtonWithOptions.Button/>
        {[<ButtonWithOptions.Option key={1}>{value}</ButtonWithOptions.Option>]}
      </StatsWidget.Filter>
    );
    createComponent({title, statistics, children});
    expect(
      driver
        .getFilterDriver('stats-widget-filter')
        .dropdownLayoutDriver.optionsContent()
    ).toContain(value);
  });

  it('should not initialize component with 1 bad child', () => {
    const PageRequiredChildrenArrayError =
      'Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `StatsWidget`, expected an array.\n    in StatsWidget';
    createComponent({title, statistics, children: <div/>});

    expect(stub).toHaveBeenCalledWith(PageRequiredChildrenArrayError);
  });

  it('should not initialize component with percent which are not a numbers', () => {
    const wrongStatistics = [
      {
        title: '10$',
        subtitle: 'Revenue',
        percent: '15%'
      },
      {
        title: '2',
        subtitle: 'Products',
        percent: '-15%'
      },
      {
        title: '1',
        subtitle: 'Transactions',
        percent: '0'
      }
    ];

    const PageRequiredChildrenArrayError =
      'Warning: Failed prop type: Invalid prop `statistics[0].percent` of type `string` supplied to `StatsWidget`, expected `number`.\n    in StatsWidget';
    createComponent({title, statistics: wrongStatistics});

    expect(stub).toHaveBeenCalledWith(PageRequiredChildrenArrayError);
  });
});

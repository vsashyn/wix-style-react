import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import WixComponent from '../BaseComponents/WixComponent';
import styles from './StatsWidget.scss';
import Heading from '../Heading';
import SortByArrowUp from '../new-icons/system/SortByArrowUp';
import SortByArrowDown from '../new-icons/system/SortByArrowDown';
import ButtonWithOptions from '../ButtonWithOptions';
import Badge from '../Badge';

function renderTrend(percent, invertPercentColor) {
  const badgeProps = {
    icon: null,
    skin: null,
    dataHook: 'percent-value',
    type: 'transparent'
  };

  //TODO - the data-class is just a hack in order not to break the testkit function that exposes it
  if (percent > 0) {
    badgeProps.prefixIcon = <SortByArrowUp data-hook="percent-icon" data-class="isPositive"/>;
    badgeProps.skin = invertPercentColor ? 'danger' : 'success';
  } else if (percent < 0) {
    badgeProps.prefixIcon = <SortByArrowDown data-hook="percent-icon" data-class="isNegative"/>;
    badgeProps.skin = invertPercentColor ? 'success' : 'danger';
  } else {
    badgeProps.prefixIcon = null;
    badgeProps.skin = 'neutral';
  }

  return (
    <Badge {...badgeProps}>{Math.abs(percent)}%</Badge>
  );
}

/**
 * Component for app widget in Business Manager
 */
class StatsWidget extends WixComponent {

  static propTypes = {
    /** Widget title */
    title: PropTypes.string.isRequired,
    /** Statistics to display:
     *
     * `invertPercentColor`: Change color of `percent` prop marking negative percent as `success` and positive as `danger` */
    statistics: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      percent: PropTypes.number,
      invertPercentColor: PropTypes.bool
    })),
    /** Filters for statistics (will be shown in right top corner) Accepts array of  <StatsWidget.Filter> which accepts all dropdown properties*/
    children: PropTypes.arrayOf((propValue, key) => {
      if (!propValue || propValue.length > 3) {
        return new Error(`StatsWidget: Invalid Prop children, maximum amount of filters are 3`);
      }

      if (propValue[key].type !== StatsWidget.Filter) {
        return new Error(`StatsWidget: Invalid Prop children, only StatsWidget.Filter is allowed`);
      }
    }),
    emptyState: PropTypes.node
  };

  _renderColumn(statistics, index) {
    return (<div className={styles.statsColumn} key={index} data-hook="statistics-item">
      <Heading dataHook="statistics-item-title" appearance="H1">{statistics.title}</Heading>
      <Heading dataHook="statistics-item-subtitle" appearance="H5">
        {statistics.subtitle}
      </Heading>
      {typeof (statistics.percent) === 'number' && renderTrend(statistics.percent, statistics.invertPercentColor)}
    </div>);
  }

  _renderFilters(filters) {
    return (<div className={styles.filtersWrapper}>{filters}</div>);
  }

  render() {
    const {title, statistics, children, emptyState} = this.props;

    return (
      <Card>
        <Card.Header
          dataHook="stats-widget-title"
          title={title}
          suffix={this._renderFilters(children)}
          />
        <Card.Content>
          {statistics ?
            <div className={styles.statsColumnWrapper} data-hook="stats-widget-content-wrapper">
              {statistics.map((stat, index) => this._renderColumn(stat, index))}
            </div> :
            <div data-hook="stats-widget-empty-state">
              { emptyState }
            </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

StatsWidget.Filter = ButtonWithOptions;

StatsWidget.displayName = 'StatsWidget';

export default StatsWidget;

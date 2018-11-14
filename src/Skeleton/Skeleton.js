import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WixComponent from '../BaseComponents/WixComponent';
import styles from './Skeleton.scss';

/**
 * Skeleton is a “placeholder” component.
 * Used for filling up screen usually for when some async operation is ongoing.
 */
export default class Skeleton extends WixComponent {
  static displayName = 'Skeleton';

  static propTypes = {
    content: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['line']),
        size: PropTypes.oneOf(['small', 'medium', 'large'])
      })
    ).isRequired,
    alignment: PropTypes.oneOf(['start', 'middle']),
    spacing: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    alignment: 'start',
    spacing: 'medium'
  };

  render() {
    const {content, alignment, spacing} = this.props;
    return (
      <div>
        {content.map((item, key) => (
          <div
            key={key}
            data-hook="placeholder-line"
            className={classnames(styles.placeholderLine, styles[spacing], {
              [styles.first]: key === 0,
              [styles.middle]: alignment === 'middle'
            })}
            >
            <div
              data-hook="placeholder-chunk"
              className={classnames(styles.chunk, styles[item.size || 'small'])}
              />
          </div>
        ))}
      </div>
    );
  }
}

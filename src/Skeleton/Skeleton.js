import React from 'react';
import PropTypes from 'prop-types';
import styles from './Skeleton.scss';
import WixComponent from '../BaseComponents/WixComponent';
import classnames from 'classnames';

class PlaceholderLine extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    isFirst: PropTypes.bool.isRequired,
    spacing: PropTypes.oneOf(['small', 'medium', 'large']),
    alignment: PropTypes.oneOf(['start', 'middle', 'end'])
  }

  render() {
    const {size, spacing, isFirst, alignment} = this.props;
    return (
      <div
        className={
          classnames(
            styles.inner,
            {
              [styles[spacing]]: true,
              [styles.first]: isFirst,
              [styles.middle]: alignment === 'middle'
            }
          )}
        >
        <div className={styles.animatedBackground}/>
        <div className={styles.concealers}>
          <div className={styles.concealerRow}>
            {alignment === 'middle' && <div
              className={
                classnames(
                  styles.concealer,
                  {
                    [styles[size]]: true
                  }
                )}
              />}
            <div
              className={
                classnames(
                  styles.skeletonCorner,
                  {
                    [styles[size]]: true
                  }
                )
              }
              />
            <div
              className={
                classnames(
                  styles.skeletonCorner,
                  styles.rightSkeletonCorner,
                  {
                    [styles[size]]: true
                  }
                )}
              />
            <div className={classnames(styles.chunk, {[styles[size]]: true})}/>
            <div
              className={
                classnames(
                  styles.concealer,
                  {
                    [styles[size]]: true
                  }
                )}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default class Skeleton extends WixComponent {
  static propTypes = {
    content: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['line']),
        size: PropTypes.oneOf(['small', 'medium', 'large'])
      })).isRequired,
    alignment: PropTypes.oneOf(['start', 'middle', 'end']),
    spacing: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    alignment: 'start',
    spacing: 'medium'
  }

  render() {
    const {content, alignment, spacing} = this.props;
    return (
      <div>
        {
          content.map((item, key) => (
            <PlaceholderLine
              key={key}
              size={item.size}
              spacing={spacing}
              isFirst={key === 0}
              alignment={alignment}
              />
          ))
        }
      </div>
    );
  }
}

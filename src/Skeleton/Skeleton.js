import React from 'react';
import PropTypes from 'prop-types';
import styles from './Skeleton.scss';
import WixComponent from '../BaseComponents/WixComponent';
import classnames from 'classnames';

class PlaceholderLine extends React.PureComponent {
  static propTypes = {
    marginBottom: PropTypes.number,
    // width: PropTypes.number
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  skeletonCornerWidth = 6;
  // style={{left: size - this.skeletonCornerWidth}}

  render() {
    const {marginBottom, size} = this.props;
    return (
      <div className={styles.inner} style={{marginBottom}}>
        <div className={styles.animatedBackground}/>
        <div className={styles.concealers}>
          <div className={styles.concealerRow}>
            <div className={styles.skeletonCorner}/>
            <div
              className={classnames(
                styles.skeletonCorner,
                styles.rightSkeletonCorner,
                {
                  [styles[size]]: true
                }
              )}
              />
            <div className={classnames(styles.chunk, {[styles[size]]: true})}/>
            <div className={classnames(styles.concealer, {[styles[size]]: true})}/>
          </div>
        </div>
      </div>
    );
  }
}

export default class Skeleton extends WixComponent {
  render() {
    return (
      <div>
        <PlaceholderLine size={'small'} marginBottom={36}/>
        <PlaceholderLine size={'large'}/>
        <PlaceholderLine size={'medium'}/>
      </div>
    );
  }
}

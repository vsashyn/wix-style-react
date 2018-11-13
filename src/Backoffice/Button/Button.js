import React from 'react';
import {func, node, string} from 'prop-types';
import styles from '../../ButtonLayout/ButtonLayout.scss';
import WixComponent from '../../BaseComponents/WixComponent';
import ButtonLayout from '../../ButtonLayout/ButtonLayout';
import omit from 'omit';
import {withFocusable, focusableStates} from '../../common/Focusable';
import {pickAccessibilityProps} from '../../common/accessibility';

class Button extends WixComponent {
  static displayName = 'Button';

  static propTypes = {
    ...ButtonLayout.propTypes,
    children: node,
    id: string,
    prefixIcon: node,
    suffixIcon: node,
    type: string,
    onClick: func,
    onMouseEnter: func,
    onMouseLeave: func
  };

  static defaultProps = {
    ...ButtonLayout.defaultProps
  };

  addIcon = (affix, icon) =>
    icon && (
      <div data-hook={`btn-${affix}`} className={styles.affixIcon}>
        {React.cloneElement(icon, {className: styles[affix]})}
      </div>
    );

  addPrefix = () => this.addIcon('prefix', this.props.prefixIcon);

  addSuffix = () => this.addIcon('suffix', this.props.suffixIcon);

  render() {
    const {
      disabled,
      onClick,
      children,
      type,
      onMouseEnter,
      onMouseLeave
    } = this.props;

    const buttonLayoutProps = omit(
      ['id', 'onClick', 'prefixIcon', 'suffixIcon', 'type'],
      this.props
    );
    return (
      <ButtonLayout {...buttonLayoutProps}>
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={this.props.focusableOnFocus} // For some reason eslint react/prop-types rule doesn't work here ?!#$
          onBlur={this.props.focusableOnBlur}
          {...focusableStates(this.props)}
          {...pickAccessibilityProps(this.props)}
          >
          {this.addPrefix()}
          {children}
          {this.addSuffix()}
        </button>
      </ButtonLayout>
    );
  }
}

export default withFocusable(Button);

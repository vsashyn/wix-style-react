import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import cx from 'classnames';
import {iconButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, node, bool, oneOf} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';

class IconButton extends WixComponent {
  static displayName = 'IconButton';

  static propTypes = {
    skin: oneOf(['standard', 'inverted', 'light']),
    priority: oneOf(['primary', 'secondary']),
    size: oneOf(['small', 'medium']),
    className: string,
    children: node,
    disabled: bool
  };

  static defaultProps = {
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    disabled: false
  };

  render() {
    const {
      skin,
      priority,
      size,
      className,
      children,
      disabled,
      ...rest
    } = this.props;
    return (
      <div className={backofficeTheme}>
        <ButtonNext
          {...rest}
          data-hook="iconButton-core"
          className={cx(className, iconButton(skin, priority, size))}
          disabled={disabled}
          >
          {React.cloneElement(children, {
            size: size === 'small' ? '18px' : '24px'
          })}
        </ButtonNext>
      </div>
    );
  }
}
export default IconButton;

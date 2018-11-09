import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import classNames from 'classnames';
import {iconButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, node, bool, oneOf} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';

class IconButton extends WixComponent {
  static displayName = 'IconButton';

  static propTypes = {
    skin: oneOf(['standard', 'light']),
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
          className={classNames(className, iconButton(skin, priority, size))}
          disabled={disabled}
          >
          {children}
        </ButtonNext>
      </div>
    );
  }
}
export default IconButton;

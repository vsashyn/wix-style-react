import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import classNames from 'classnames';
import {iconButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import WixComponent from '../BaseComponents/WixComponent';

class IconButton extends WixComponent {
  static displayName = 'IconButton';
  static propTypes = {};
  static defaultProps = {};

  render() {
    const {className, children, ...rest} = this.props;
    return (
      <div className={backofficeTheme}>
        <ButtonNext {...rest} className={classNames(className, iconButton())}>
          {children}
        </ButtonNext>
      </div>
    );
  }
}
export default IconButton;

import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, func, element, bool, node, oneOf} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import {Underline} from '../Icons/dist/index';

class TextButton extends WixComponent {
  static displayName = 'TextButton';

  static propTypes = {
    className: string,
    skin: oneOf(['standard', 'light', 'premium', 'dark']),
    underlined: oneOf(['none', 'onHover', 'underlined']),
    weight: oneOf(['thin', 'normal']),
    disabled: bool,
    onClick: func,
    suffixIcon: element,
    prefixIcon: element,
    children: node
  };

  static defaultProps = {
    skin: 'standard',
    underlined: 'none',
    weight: 'thin'
  };

  render() {
    const {
      onClick,
      suffixIcon,
      prefixIcon,
      children,
      disabled,
      skin,
      underlined,
      weight,
      className
    } = this.props;
    return (
      <div className={backofficeTheme}>
        <ButtonNext
          data-hook="textButton-core"
          onClick={onClick}
          className={className || textButton(skin, underlined, weight)}
          suffixIcon={suffixIcon}
          prefixIcon={prefixIcon}
          disabled={disabled}
          >
          {children}
        </ButtonNext>
      </div>
    );
  }
}

export default TextButton;

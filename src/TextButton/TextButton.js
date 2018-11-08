import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import classNames from 'classnames';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, func, element, bool, node, oneOf} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

class TextButton extends WixComponent {
  static displayName = 'TextButton';

  static propTypes = {
    className: string,
    skin: oneOf(['standard', 'light', 'premium', 'dark']),
    underlined: oneOf(['none', 'onHover', 'underlined']),
    weight: oneOf(['thin', 'normal']),
    size: oneOf(['small', 'medium']),
    disabled: bool,
    onClick: func,
    suffixIcon: element,
    prefixIcon: element,
    children: node
  };

  static defaultProps = {
    skin: 'standard',
    underlined: 'none',
    weight: 'thin',
    size: 'premium'
  };

  render() {
    const {
      onClick,
      skin,
      underlined,
      weight,
      size,
      suffixIcon,
      prefixIcon,
      children,
      disabled,
      className
    } = this.props;

    return (
      <div className={backofficeTheme}>
        <ButtonNext
          data-hook="textButton-core"
          onClick={onClick}
          className={classNames(
            className,
            textButton(skin, underlined, weight, size)
          )}
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

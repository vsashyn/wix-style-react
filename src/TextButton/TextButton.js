import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, func, element, bool, node} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

class TextButton extends WixComponent {
  static displayName = 'TextButton';

  static propTypes = {
    className: string,
    disabled: bool,
    onClick: func,
    suffixIcon: element,
    prefixIcon: element,
    children: node
  };

  static defaultProps = {};

  render() {
    const {
      onClick,
      suffixIcon,
      prefixIcon,
      children,
      disabled,
      className
    } = this.props;
    return (
      <div className={backofficeTheme}>
        <ButtonNext
          data-hook="button-core"
          onClick={onClick}
          className={className || textButton()}
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

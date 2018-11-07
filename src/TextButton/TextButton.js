import React, {Component} from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, func, element, bool} from 'prop-types';

class TextButton extends Component {
  static displayName = 'TextButton';

  static propTypes = {
    dataHook: string,
    className: string,
    disabled: bool,
    onClick: func,
    suffixIcon: element,
    prefixIcon: element,
    children: Node
  };

  static defaultProps = {};

  render() {
    const {
      dataHook,
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
          data-hook={dataHook}
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

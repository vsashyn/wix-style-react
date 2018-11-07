import React from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import classNames from 'classnames';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, func, element, bool, node, oneOf} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

const allowedSkins = ['standard', 'light', 'premium', 'dark'];
const allowedUnderlined = ['none', 'onHover', 'underlined'];
const allowedWeight = ['thin', 'normal'];
const allowedSize = ['small', 'medium'];

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
    size: 'medium'
  };

  render() {
    const {
      onClick,
      suffixIcon,
      prefixIcon,
      children,
      disabled,
      className
    } = this.props;

    const skin = allowedSkins.includes(this.props.skin) ?
      this.props.skin :
      undefined;
    const size = allowedSize.includes(this.props.size) ?
      this.props.size :
      undefined;
    const underlined = allowedUnderlined.includes(this.props.underlined) ?
      this.props.underlined :
      undefined;
    const weight = allowedWeight.includes(this.props.weight) ?
      this.props.weight :
      undefined;

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

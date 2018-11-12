import React, {Component} from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import cx from 'classnames';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, node, oneOf} from 'prop-types';

class TextButton extends Component {
  static displayName = 'TextButton';

  static propTypes = {
    className: string,
    skin: oneOf(['standard', 'light', 'premium', 'dark']),
    underline: oneOf(['none', 'onHover', 'always']),
    weight: oneOf(['thin', 'normal']),
    size: oneOf(['small', 'medium']),
    children: node,
    dataHook: string
  };

  static defaultProps = {
    skin: 'standard',
    underline: 'none',
    weight: 'thin',
    size: 'medium'
  };

  render() {
    const {
      skin,
      underline,
      weight,
      size,
      children,
      className,
      dataHook,
      ...rest
    } = this.props;

    const classNames = cx(className, textButton(skin, underline, weight, size));

    return (
      <div className={backofficeTheme} data-hook={dataHook}>
        <ButtonNext
          {...rest}
          data-hook="textButton-core"
          className={classNames}
          >
          {children}
        </ButtonNext>
      </div>
    );
  }
}

export default TextButton;

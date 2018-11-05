import React, {Component} from 'react';
import ButtonNext from 'wix-ui-core/button-next';
import {textButton} from 'wix-ui-core/themes/backoffice';
//import PropTypes from 'prop-types';

class TextButton extends Component {
  static displayName = 'TextButton';
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return <ButtonNext className={textButton()}/>;
  }
}

export default TextButton;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../Label';
import Tooltip from '../Tooltip';
import Text, {SKINS} from '../Text';

import InfoIcon from '../common/InfoIcon';
import styles from './FormField.scss';

const asterisk =
  (<div
    data-hook="formfield-asterisk"
    className={styles.asterisk}
    children="*"
    />);

const charactersLeft = lengthLeft => {
  const colorProps = lengthLeft >= 0 ? {light: true, secondary: true} : {skin: SKINS.error};
  return (
    <Text
      size="small" weight="normal" {...colorProps}
      data-hook="formfield-counter"
      className={styles.counter}
      children={lengthLeft}
      />);
};

class FormField extends React.Component {
  static displayName = 'FormField';
  static propTypes = {
    /**
     * any kids to render, should be some form of input. Input, InputArea & RichTextArea work well
     *
     * `children` can be React node or a function
     *
     * when function, it receives object with:
     * * `setCharactersLeft` - function accepts a number and will display it on top right of `FormField` component
     *
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

    /** optional text labeling this form field */
    label: PropTypes.node,

    /** whether to display an asterisk (*) or not */
    required: PropTypes.bool,

    /** whether to render the field content horizontally */
    horizontal: PropTypes.bool,

    /** display info icon with tooltip. Node from this prop is content of tooltip */
    infoContent: PropTypes.node,

    /** info icon tooltip props */
    infoTooltipProps: PropTypes.shape(Tooltip.propTypes),

    /** string used to match text label with FormField children. For example:
     *
     * ```js
     * <FormField id="myFormField" label="Hello">
     *   <Input id="myFormField"/>
     * </FormField>
     * ```
     */
    id: PropTypes.string,

    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {
    required: false
  }

  state = {
    lengthLeft: undefined
  }

  childrenRenderPropInterface = {
    setCharactersLeft: lengthLeft => this.setState({lengthLeft})
  }

  renderChildren() {
    const {children} = this.props;
    if (typeof children === 'function') {
      return children(this.childrenRenderPropInterface);
    }

    return children;
  }

  _renderInfoIcon = () => {
    const {infoContent, infoTooltipProps} = this.props;
    return infoContent && <InfoIcon dataHook="formfield-infoicon" className={styles.infoIcon} tooltipProps={{content: infoContent, ...infoTooltipProps, dataHook: 'formfield-infotooltip'}}/>;
  };

  render() {
    const {label, required, horizontal, infoContent, dataHook, id} = this.props;
    const {lengthLeft} = this.state;

    return (
      <div
        data-hook={dataHook}
        className={classnames(styles.root, {[styles.horizontal]: horizontal})}
        >
        { label &&
        <div
          className={styles.label}
          data-hook="formfield-label"
          >
          <Label appearance="T1" children={label} for={id}/>

          { required && asterisk }
          { this._renderInfoIcon() }
          { typeof lengthLeft === 'number' && charactersLeft(lengthLeft) }
        </div>
      }

        <div
          data-hook="formfield-children"
          className={classnames(styles.children, {[styles.childrenWithoutLabel]: !label})}
          >
          {this.renderChildren()}
        </div>

        { !label && (required || infoContent) &&
        <div
          data-hook="formfield-inline-suffixes"
          className={styles.suffixesInline}
          >
          { required && asterisk }
          { this._renderInfoIcon() }
        </div>
      }
      </div>
    );
  }
}

export default FormField;

import styles from './DropdownLayout.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import isEqual from 'lodash/isEqual';
import trim from 'lodash/trim';
import findIndex from 'lodash/findIndex';
import scrollIntoView from '../utils/scrollIntoView';

const modulu = (n, m) => {
  const remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

const NOT_HOVERED_INDEX = -1;
export const DIVIDER_OPTION_VALUE = '-';

class DropdownLayout extends WixComponent {

  constructor(props) {
    super(props);

    this.state = {
      hovered: NOT_HOVERED_INDEX,
      selectedId: props.selectedId
    };

    this._onSelect = this._onSelect.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClose = this._onClose.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  _isControlled() {
    return typeof this.props.selectedId !== 'undefined';
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.focusOnSelectedOption) {
      this.focusOnSelectedOption();
    }
  }

  focusOnSelectedOption() {
    if (this.selectedOption) {
      this.options.scrollTop = Math.max(this.selectedOption.offsetTop - this.selectedOption.offsetHeight, 0);
    }
  }

  setSelectedOptionNode(optionNode, option) {
    if (option.id === this.state.selectedId) {
      this.selectedOption = optionNode;
    }
  }

  isLegalOption(option) {
    if (typeof option !== 'object' || typeof option.value === 'undefined') {
      return false;
    }

    if (option.value === DIVIDER_OPTION_VALUE) {
      return true;
    }

    return typeof option.id !== 'undefined' && trim(option.id).length > 0 && (
      React.isValidElement(option.value) ||
      (typeof option.value === 'string' && trim(option.value).length > 0)
    );
  }

  onClickOutside(event) {
    const {visible, onClickOutside} = this.props;
    if (visible && onClickOutside) {
      onClickOutside(event);
    }
  }

  _onSelect(index) {
    const {options, onSelect} = this.props;
    const chosenOption = options[index];

    if (chosenOption) {
      const sameOptionWasPicked = chosenOption.id === this.state.selectedId;
      if (onSelect) {
        onSelect(chosenOption, sameOptionWasPicked);
      }
    }
    if (!this._isControlled()) {
      this.setState({selectedId: chosenOption && chosenOption.id});
    }
    return !!onSelect && chosenOption;
  }

  _onMouseEnter(index) {
    if (this.isSelectableOption(this.props.options[index])) {
      this.setState({hovered: index});
    }
  }

  _onMouseLeave() {
    this.setState({
      hovered: NOT_HOVERED_INDEX
    });
  }

  hoverNextStep(step) {
    const {options} = this.props;

    if (!options.some(this.isSelectableOption)) {
      return;
    }

    let newHovered = this.state.hovered;
    do {
      newHovered = Math.abs(modulu(Math.max(newHovered + step, -1), options.length));
    } while (!this.isSelectableOption(options[newHovered]));

    this.setState({hovered: newHovered});

    const menuElement = this.options;
    const hoveredElement = this.options.childNodes[newHovered];

    scrollIntoView(menuElement, hoveredElement);
  }

  /**
   * Handle keydown events for the DropdownLayout, mostly for accessibility
   *
   * @param {SyntheticEvent} event - The keydown event triggered by React
   * @returns {boolean} - Whether the event was handled by the component
   */
  _onKeyDown(event) {
    if (!this.props.visible || this.props.isComposing) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown': {
        this.hoverNextStep(1);
        break;
      }

      case 'ArrowUp': {
        this.hoverNextStep(-1);
        break;
      }

      case ' ':
      case 'Spacebar':
      case 'Enter': {
        if (!this._onSelect(this.state.hovered)) {
          return false;
        }
        break;
      }

      case 'Tab': {
        if (this.props.closeOnSelect) {
          return this._onSelect(this.state.hovered);
        } else {
          event.preventDefault();
          if (!this._onSelect(this.state.hovered)) {
            return false;
          }
        }
        break;
      }

      case 'Escape': {
        this._onClose();
        break;
      }

      default: {
        return false;
      }
    }

    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  _onClose() {
    this.setState({
      hovered: NOT_HOVERED_INDEX
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  renderNode(node) {
    return node ? <div className={styles.node}>{node}</div> : null;
  }

  render() {
    const {options, visible, dropDirectionUp, tabIndex, fixedHeader, fixedFooter, withArrow, onMouseEnter, onMouseLeave, inContainer} = this.props;
    const contentContainerClassName = classNames({
      [styles.contentContainer]: true,
      [styles.shown]: visible,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp,
      [styles.withArrow]: withArrow,
      [styles.containerStyles]: !inContainer
    });

    return (
      <div tabIndex={tabIndex} className={classNames(styles.wrapper, styles[`theme-${this.props.theme}`])} onKeyDown={this._onKeyDown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={contentContainerClassName} style={{maxHeight: this.props.maxHeightPixels + 'px', minWidth: this.props.minWidthPixels ? `${this.props.minWidthPixels}px` : undefined}}>
          {this.renderNode(fixedHeader)}
          <div className={styles.options} style={{maxHeight: this.props.maxHeightPixels - 35 + 'px'}} ref={options => this.options = options} data-hook="dropdown-layout-options">
            {options.map((option, idx) => (
              this.renderOption({option, idx})
            ))}
          </div>
          {this.renderNode(fixedFooter)}
        </div>
        {this.renderTopArrow()}
      </div>
    );
  }

  renderOption({option, idx}) {
    const {value, id, disabled, title, overrideStyle, linkTo} = option;
    if (value === DIVIDER_OPTION_VALUE) {
      return this.renderDivider(idx, `dropdown-divider-${id || idx}`);
    }

    const content = this.renderItem({
      option,
      idx,
      selected: id === this.state.selectedId,
      hovered: idx === this.state.hovered,
      disabled: disabled || title,
      title,
      overrideStyle,
      dataHook: `dropdown-item-${id}`
    });

    return linkTo ? <a key={idx} data-hook="link-item" href={linkTo}>{content}</a> : content;
  }

  renderDivider(idx, dataHook) {
    return (<div key={idx} className={styles.divider} data-hook={dataHook}/>);
  }

  renderItem({option, idx, selected, hovered, disabled, title, overrideStyle, dataHook}) {
    const {itemHeight, selectedHighlight} = this.props;

    const optionClassName = classNames({
      [styles.option]: !overrideStyle,
      [styles.selected]: selected && !overrideStyle && selectedHighlight,
      wixstylereactSelected: selected && overrideStyle, //global class for items that use the overrideStyle
      [styles.hovered]: hovered && !overrideStyle,
      wixstylereactHovered: hovered && overrideStyle, //global class for items that use the overrideStyle
      [styles.disabled]: disabled,
      [styles.title]: title,
      [styles.smallHeight]: itemHeight === 'small',
      [styles.bigHeight]: itemHeight === 'big'
    });

    return (
      <div
        className={optionClassName}
        ref={node => this.setSelectedOptionNode(node, option)}
        onMouseDown={!disabled ? () => this._onSelect(idx) : null}
        key={idx}
        onMouseEnter={() => this._onMouseEnter(idx)}
        onMouseLeave={this._onMouseLeave}
        data-hook={dataHook}
        >
        {option.value}
      </div>
    );
  }

  renderTopArrow() {
    const {withArrow, visible, dropDirectionUp} = this.props;
    const arrowClassName = classNames({
      [styles.arrow]: true,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp
    });
    return withArrow && visible ? <div className={arrowClassName}/> : null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      let hoverIndex;
      if (nextProps.visible) {
        hoverIndex = findIndex(this.props.options, item => item.id === this.state.selectedId);
      }
      this.setState({hovered: hoverIndex >= 0 ? hoverIndex : NOT_HOVERED_INDEX});
    }

    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({selectedId: nextProps.selectedId});
    }

    if (!isEqual(this.props.options, nextProps.options)) {
      if (nextProps.options.some(option => !this.isLegalOption(option))) {
        throw new Error(`DropdownLayout: Invalid options provided: ${nextProps.options}`);
      }

      if (this.state.hovered !== NOT_HOVERED_INDEX) {
        this.setState({
          hovered: findIndex(nextProps.options, item => item.id === this.props.options[this.state.hovered].id)
        });
      }
    }
  }

  isSelectableOption(option) {
    return option.value !== '-' && !option.disabled && !option.title;
  }
}

DropdownLayout.propTypes = {
  dropDirectionUp: PropTypes.bool,
  focusOnSelectedOption: PropTypes.bool,
  onClose: PropTypes.func,
  /** Callback function called whenever the user selects a different option in the list */
  onSelect: PropTypes.func,
  visible: PropTypes.bool,
  /** Array of objects. Objects must have an Id and can can include value and node. If value is '-', a divider will be rendered instead  (dividers do not require and id). */
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      value: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
      ]).isRequired,
      disabled: PropTypes.bool,
      overrideStyle: PropTypes.bool
    }),

    // A divider option without an id
    PropTypes.shape({
      value: PropTypes.oneOf([DIVIDER_OPTION_VALUE])
    })
  ])),
  /** The id of the selected option in the list  */
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  tabIndex: PropTypes.number,
  theme: PropTypes.string,
  onClickOutside: PropTypes.func,
  /** A fixed header to the list */
  fixedHeader: PropTypes.node,
  /** A fixed footer to the list */
  fixedFooter: PropTypes.node,
  maxHeightPixels: PropTypes.number,
  minWidthPixels: PropTypes.number,
  withArrow: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  itemHeight: PropTypes.oneOf(['small', 'big']),
  selectedHighlight: PropTypes.bool,
  inContainer: PropTypes.bool
};

DropdownLayout.defaultProps = {
  options: [],
  tabIndex: 0,
  maxHeightPixels: 260,
  closeOnSelect: true,
  itemHeight: 'small',
  selectedHighlight: true,
  inContainer: false
};

DropdownLayout.NONE_SELECTED_ID = NOT_HOVERED_INDEX;

export default DropdownLayout;

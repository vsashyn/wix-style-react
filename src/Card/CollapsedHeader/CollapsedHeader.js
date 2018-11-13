import React from 'react';
import {bool, node, oneOf, func, string} from 'prop-types';
import Collapse from 'react-collapse';

import deprecationLog from '../../utils/deprecationLog';
import ToggleSwitch from '../../../src/ToggleSwitch';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import Header from '../Header';
import Button from '../../../src/Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';

class CollapsedHeader extends WixComponent {
  static displayName = 'Card.CollapsedHeader';
  static propTypes = {
    ...Header.propTypes,
    children: node,
    toggleStyle: oneOf(['switch', 'button']),
    collapsed: bool,
    onCollapsedChange: func,
    buttonCollapseText: string,
    buttonExpandText: string,
    controlled: bool
  };

  static defaultProps = {
    collapsed: false,
    toggleStyle: 'switch',
    buttonCollapseText: 'Less',
    buttonExpandText: 'More',
    controlled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: props.collapsed
    };
  }

  componentDidMount() {
    deprecationLog(
      'Card.CollapsedHeader is deprecated. Instead please use <Card><Collapse><Card.Content/></Collapse></Card>'
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.collapsed !== nextProps.collapsed &&
      nextProps.collapsed !== this.state.isCollapsed
    ) {
      this.setState({isCollapsed: nextProps.collapsed});
    }
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  onCollapsedChange() {
    const {onCollapsedChange} = this.props;
    onCollapsedChange && onCollapsedChange(this.state.isCollapsed);
  }

  onToggleChange = () => {
    const {controlled} = this.props;

    if (controlled) {
      this.onCollapsedChange();
    } else {
      this.setState(
        ({isCollapsed}) => ({isCollapsed: !isCollapsed}),
        this.onCollapsedChange
      );
    }
  };

  _toggleSwitchElement = () => (
    <div onClick={this.stopPropagation}>
      <ToggleSwitch
        dataHook="switch"
        onChange={this.onToggleChange}
        checked={!this.state.isCollapsed}
        />
    </div>
  );

  _buttonElement = () => (
    <div onClick={this.stopPropagation}>
      <Button
        withNewIcons
        dataHook="button"
        height="medium"
        prefixIcon={this.state.isCollapsed ? <ChevronDown/> : <ChevronUp/>}
        onClick={this.onToggleChange}
        theme="whiteblueprimary"
        type="button"
        >
        {this.state.isCollapsed ?
          this.props.buttonExpandText :
          this.props.buttonCollapseText}
      </Button>
    </div>
  );

  render() {
    const {title, subtitle, children, withoutDivider, toggleStyle} = this.props;

    const {isCollapsed} = this.state;

    return (
      <div>
        <div onClick={this.onToggleChange}>
          <Header
            title={title}
            subtitle={subtitle}
            suffix={
              toggleStyle === 'switch' ?
                this._toggleSwitchElement() :
                this._buttonElement()
            }
            withoutDivider={withoutDivider || isCollapsed}
            />
        </div>

        <Collapse isOpened={!isCollapsed} children={children}/>
      </div>
    );
  }
}

export default CollapsedHeader;

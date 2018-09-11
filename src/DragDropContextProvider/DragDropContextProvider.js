import React from 'react';
import PropTypes from 'prop-types';
import {DragDropManager} from 'dnd-core';
import HTML5Backend from 'react-dnd-html5-backend';

let defaultManager;
function getDefaultManager() {
  if (!defaultManager) {
    defaultManager = new DragDropManager(HTML5Backend);
  }
  return defaultManager;
}

// https://github.com/react-dnd/react-dnd/issues/186#issuecomment-110333064
class DragDropContextProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  static contextTypes = {
    dragDropManager: PropTypes.object
  };

  static childContextTypes = {
    dragDropManager: PropTypes.object
  };

  getChildContext() {
    return {
      dragDropManager: this.context.dragDropManager || getDefaultManager()
    };
  }

  render() {
    return this.props.children;
  }
}

export default DragDropContextProvider;

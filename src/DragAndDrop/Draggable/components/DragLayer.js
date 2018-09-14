import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {DragLayer} from 'react-dnd';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

/* eslint-disable new-cap */

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

let dragPreviewRef = null;
let mountNode = null;

const onOffsetChange = monitor => {
  if (!dragPreviewRef) {
    return;
  }

  const offset = monitor.getSourceClientOffset() || monitor.getInitialClientOffset();
  if (!offset) {
    return;
  }

  const transform = `translate(${offset.x}px, ${offset.y}px)`;
  dragPreviewRef.style.transform = transform;
  dragPreviewRef.style['-webkit-transform'] = transform;
};

class CustomDragLayer extends React.Component {
  shouldRenderLayer = (props = this.props) => {
    const {id, item, itemType, draggedType, isDragging} = props;
    return isDragging && id === item.id && itemType === draggedType;
  };

  componentDidUpdate(prevProps) {
    const prev = this.shouldRenderLayer(prevProps);
    const next = this.shouldRenderLayer(this.props);
    if (prev && !next) {
      this.removeFromPortal();
    } else if (!prev && next) {
      this.renderInPortal(
        <div
          style={layerStyles}
          ref={node => dragPreviewRef = node}
          >
          {this.props.renderPreview({})}
        </div>
      );
    }
  }

  renderInPortal = element => {
    if (!mountNode) {
      mountNode = document.createElement('div');
      mountNode.id = 'magic-id';
      document.body.appendChild(mountNode);
    }
    if (!dragPreviewRef) {
      renderSubtreeIntoContainer(this, element, mountNode);
    }
  }

  removeFromPortal = () => {
    if (mountNode) {
      ReactDOM.unmountComponentAtNode(mountNode);
      document.body.removeChild(mountNode);
      mountNode = null;
    }
  }


  render() {
    if (this.shouldRenderLayer()) {
      return <div/>;
    }
    return null;
  }
}

CustomDragLayer.propTypes = {
  offsetOfHandle: PropTypes.object,
  item: PropTypes.object,
  itemType: PropTypes.string,
  draggedType: PropTypes.string,
  isDragging: PropTypes.bool,
  renderPreview: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DragLayer((monitor, props) => {
  onOffsetChange(monitor);
  return {
    offsetOfHandle: props.offsetOfHandle,
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging()
  };
})(CustomDragLayer);

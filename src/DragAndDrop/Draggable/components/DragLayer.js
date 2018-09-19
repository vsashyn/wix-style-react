import * as React from 'react';
import PropTypes from 'prop-types';
import {DragLayer} from 'react-dnd';

/* eslint-disable new-cap */

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

let dragPreviewRef = null;

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
  render() {
    const {
      item,
      itemType,
      draggedType,
      isDragging,
      renderPreview,
      id,
      offsetOfHandler
    } = this.props;
    const shouldRenderLayer = isDragging && id === item.id && itemType === draggedType;
    if (!shouldRenderLayer) {
      return null;
    }
    /* if user drag by handle, then we need to move preview item, to show correct position of item during drag */
    const styles = Object.assign({}, layerStyles, {left: -offsetOfHandler.x, top: -offsetOfHandler.y});
    return <div style={styles} ref={node => dragPreviewRef = node}>{renderPreview({})}</div>;
  }
}

CustomDragLayer.propTypes = {
  offsetOfHandler: PropTypes.object,
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
    offsetOfHandler: props.offsetOfHandler,
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging()
  };
})(CustomDragLayer);

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

const dragLayerStyle = ({initialOffset, currentOffset}) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    ...layerStyles,
    transform,
    WebkitTransform: transform
  };
};

const CustomDragLayer = ({
  item,
  itemType,
  draggedType,
  isDragging,
  renderPreview,
  id,
  initialOffset,
  currentOffset
}) => {
  const shouldRenderLayer = isDragging && id === item.id && itemType === draggedType;
  if (!shouldRenderLayer) {
    return null;
  }
  const previewStyles = dragLayerStyle({initialOffset, currentOffset});

  return <div>{renderPreview({previewStyles})}</div>;
};

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  draggedType: PropTypes.string,
  isDragging: PropTypes.bool,
  renderPreview: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialOffset: PropTypes.object,
  currentOffset: PropTypes.object
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);

import * as React from 'react';
import {Portal} from 'react-portal';
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
  shouldRenderLayer = (props = this.props) => {
    const {id, item, itemType, draggedType, isDragging} = props;
    return isDragging && id === item.id && itemType === draggedType;
  };

  renderPreview = () => {
    const {offsetOfHandle} = this.props;
    const styles = Object.assign({}, layerStyles, {left: -offsetOfHandle.x, top: -offsetOfHandle.y});
    return (
      <div
        style={styles}
        ref={node => dragPreviewRef = node}
        >
        {this.props.renderPreview({})}
      </div>
    );
  }

  renderPreviewInPortal = () => {
    return (
      <Portal>
        {this.renderPreview()}
      </Portal>
    );
  }

  render() {
    if (!this.shouldRenderLayer()) {
      return null;
    }
    return this.props.usePortal ? this.renderPreviewInPortal() : this.renderPreview();
  }
}

CustomDragLayer.propTypes = {
  offsetOfHandle: PropTypes.object,
  item: PropTypes.object,
  itemType: PropTypes.string,
  draggedType: PropTypes.string,
  isDragging: PropTypes.bool,
  renderPreview: PropTypes.func,
  usePortal: PropTypes.bool,
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

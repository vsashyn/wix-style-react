import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

import DragLayer from './DragLayer';
import {ItemTypes} from './../types';

/* eslint-disable new-cap */

const source = {
  beginDrag: ({id, index, containerId, groupName, item, onMoveOut}) => {
    /** we setup monitor.getItem() snapshot, so we will be always able to get info about item that we drag */
    return {
      id,
      index,
      containerId,
      groupName,
      originalItem: item,
      onMoveOut,
      realTime: {
        onMoveOut,
        containerId
      }
    };
  },
  endDrag: ({index, containerId, onDrop}, monitor) => {
    /** if drop was called, on drop target and drag is end, then we notify parent about this */
    if (monitor.getDropResult()) {
      onDrop({
        payload: monitor.getItem().originalItem, // original item
        removedIndex: index, // original item index
        addedIndex: monitor.getDropResult().index, // new item index
        addedToContainerId: monitor.getDropResult().containerId, // new container for item
        removedFromContainerId: containerId // original item container
      });
    }
  },
  isDragging: ({id, containerId, groupName}, monitor) => {
    const item = monitor.getItem();
    const isSameGroup = groupName && item.groupName && groupName === item.groupName;
    const isSameContainer = containerId === item.containerId;
    return (isSameGroup || isSameContainer) && item.id === id;
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

@DragSource(ItemTypes.DRAGGABLE, source, collect)
export default class DraggableSource extends React.Component {
  componentDidMount() {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage(), {captureDraggingState: true});
    }
  }

  _renderDraggableItem() {
    const {isDragging, connectDragSource, withHandle, renderItem, id, item} = this.props;
    if (withHandle) {
      return renderItem({
        id,
        item,
        isPlaceholder: isDragging,
        connectHandle: handle => connectDragSource(handle)
      });
    }

    return renderItem({
      id,
      item,
      isPlaceholder: isDragging,
      connectHandle: noop
    });
  }

  _renderPreview = ({previewStyles}) => {
    const {renderItem, id, item} = this.props;
    return renderItem({
      id,
      item,
      previewStyles,
      isPreview: true,
      connectHandle: noop
    });
  }

  _renderPreviewItem() {
    const {id} = this.props;
    return (
      <DragLayer
        renderPreview={this._renderPreview}
        id={id}
        draggedType={ItemTypes.DRAGGABLE}
        />
    );
  }

  render() {
    const {connectDragSource} = this.props;
    return connectDragSource ? connectDragSource(
      <div>
        {this._renderDraggableItem()}
        {this._renderPreviewItem()}
      </div>
    ) : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool, // from react-dnd
  connectDragSource: PropTypes.func, // from react-dnd
  connectDragPreview: PropTypes.func, // from react-dnd

  groupName: PropTypes.string,
  containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  withHandle: PropTypes.bool,
  onDrop: PropTypes.func,
  onMoveOut: PropTypes.func
};


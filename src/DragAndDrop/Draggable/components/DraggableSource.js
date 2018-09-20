import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

import DragLayer from './DragLayer';
import {ItemTypes} from './../types';

/* eslint-disable new-cap */

const source = {
  beginDrag: ({id, index, containerId, groupName, item, onMoveOut, onDragStart}) => {
    if (onDragStart) {
      onDragStart();
    }
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
  endDrag: ({index, containerId, onDrop, onDragEnd}, monitor) => {
    /** if drop was called, on drop target and drag is end, then we notify parent about this */
    if (onDragEnd) {
      onDragEnd();
    }
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
  state = {
    offsetOfHandle: {x: 0, y: 0}
  }

  componentDidMount() {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage(), {captureDraggingState: true});
    }
    this.updateDiff();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id || prevProps.containerId !== this.props.containerId) {
      this.updateDiff();
    }
  }

  updateDiff() {
    /* in case if we have handle, the drag will start in wrong position and we need to fix this */
    if (this.props.withHandle && this.handleNode) {
      this.setState({
        offsetOfHandle: {
          x: this.handleNode.getBoundingClientRect().x - this.rootNode.getBoundingClientRect().x,
          y: this.handleNode.getBoundingClientRect().y - this.rootNode.getBoundingClientRect().y
        }
      });
    }
  }

  _renderDraggableItem() {
    const {isDragging, connectDragSource, withHandle, renderItem, id, item} = this.props;
    if (withHandle) {
      return renderItem({
        id,
        item,
        isPlaceholder: isDragging,
        connectHandle: handle => {
          const handleWithRef = React.cloneElement(handle, {
            ref: node => this.handleNode = ReactDOM.findDOMNode(node)
          });
          return connectDragSource(handleWithRef);
        }
      });
    }

    return connectDragSource(
      renderItem({
        id,
        item,
        isPlaceholder: isDragging,
        connectHandle: noop
      })
    );
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
    const {id, usePortal} = this.props;
    return (
      <DragLayer
        offsetOfHandle={this.state.offsetOfHandle}
        usePortal={usePortal}
        renderPreview={this._renderPreview}
        id={id}
        draggedType={ItemTypes.DRAGGABLE}
        />
    );
  }

  render() {
    const {connectDragSource} = this.props;
    return connectDragSource ?
      <div ref={node => this.rootNode = node}>
        {this._renderDraggableItem()}
        {this._renderPreviewItem()}
      </div> : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool, // from react-dnd
  connectDragSource: PropTypes.func, // from react-dnd
  connectDragPreview: PropTypes.func, // from react-dnd

  usePortal: PropTypes.bool,
  groupName: PropTypes.string,
  containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  withHandle: PropTypes.bool,
  onDrop: PropTypes.func,
  onMoveOut: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};


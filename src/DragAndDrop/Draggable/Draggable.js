import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import DraggableSource from './components/DraggableSource';
import DraggableTarget from './components/DraggableTarget';

export class Draggable extends WixComponent {
  render() {
    return (
      <DraggableTarget {...this.props}>
        <DraggableSource {...this.props}/>
      </DraggableTarget>
    );
  }
}

Draggable.propTypes = {
  /** decide whether to render a handle using `connectHandle` (see below) */
  withHandle: PropTypes.bool,
  /** uniq id of container that contain current draggable item */
  containerId: PropTypes.string,
  /* name of group between inside of each dnd is allowed */
  groupName: PropTypes.string,
  /* custom renderer for item */
  renderItem: PropTypes.func,
  /* position of item in container items array */
  index: PropTypes.number,
  /* uniq id of an item */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /* model that represent item */
  item: PropTypes.object,
  /** callback when item was moved out from current container to another container */
  onMoveOut: PropTypes.func,
  /** callback when item was dropped in a new location */
  onDrop: PropTypes.func,
  /** callback when item is hovered*/
  onHover: PropTypes.func
};

export default Draggable;

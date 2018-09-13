import React from 'react';
import PropTypes from 'prop-types';
import copy from 'lodash/cloneDeep';
import shallowCompare from 'react-addons-shallow-compare';

import WixComponent from '../BaseComponents/WixComponent';
import {Draggable} from '../DragAndDrop/Draggable';
import Container from '../DragAndDrop/Draggable/components/Container';
import DragDropContextProvider from '../DragDropContextProvider';

/**
 * Attaches Drag and Drop behavior to a list of items
 */
export default class SortableList extends WixComponent {
  state = {
    items: this.props.items || []
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps({items}) {
    if (items) {
      this.setState({items});
    }
  }

  handleMoveOut = id => {
    this.setState({items: this.state.items.filter(it => it.id !== id)});
  }

  handleHover = (removedIndex, addedIndex, options = {}) => {
    this.setState(prevState => {
      const nextItems = copy(prevState.items);
      if (!nextItems.find(it => it.id === options.id)) {
        nextItems.splice(addedIndex, 0, options.item);
      } else {
        nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
      }

      return {items: nextItems};
    });
  };

  handleDrop = ({payload, addedIndex, removedIndex, addedToContainerId, removedFromContainerId}) => {
    this.props.onDrop({
      payload,
      addedIndex,
      removedIndex,
      addedToContainerId,
      removedFromContainerId
    });
  };

  renderPreview() {
    const {className, contentClassName, renderItem} = this.props;
    return (
      <div className={className}>
        <div className={contentClassName}>
          {
            this.state.items.map(
              (item, index) => (
                <div key={`${item.id}-${index}-${this.props.containerId}`}>
                  {
                    renderItem({
                      item,
                      id: item.id,
                      isPlaceholder: false,
                      isPreview: false
                    })
                  }
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }

  render() {
    const {className, contentClassName, groupName, dragPreview} = this.props;
    const common = {
      groupName,
      containerId: this.props.containerId,
      onHover: this.handleHover,
      onMoveOut: this.handleMoveOut
    };

    if (dragPreview) {
      return this.renderPreview();
    }

    return (
      <DragDropContextProvider>
        <Container
          className={className}
          total={this.state.items.length}
          {...common}
          >
          <div className={contentClassName}>
            {
            this.state.items.map((item, index) => (
              <Draggable
                {...common}
                key={`${item.id}-${index}-${this.props.containerId}`}
                id={item.id}
                index={index}
                item={item}
                renderItem={this.props.renderItem}
                withHandle={this.props.withHandle}
                onDrop={this.handleDrop}
                />
            ))
          }
          </div>
        </Container>
      </DragDropContextProvider>
    );
  }
}

SortableList.displayName = 'SortableList';

SortableList.propTypes = {
  ...Draggable.propTypes,
  /** list of items with {id: any} */
  dragPreview: PropTypes.bool,
  items: PropTypes.array,
  className: PropTypes.string,
  contentClassName: PropTypes.string
};

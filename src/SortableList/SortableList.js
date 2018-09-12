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

  componentDidMount() {
    this.updateCachedItems();
    this.setState({});
  }

  componentWillReceiveProps({items}) {
    if (items) {
      this.setState({items}, () => this.updateCachedItems());
    }
  }

  handleMoveOut = id => {
    this.setState({items: this.state.items.filter(it => it.id !== id)}, () => this.updateCachedItems());
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
    }, () => this.updateCachedItems());
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

  updateCachedItems = () => {
    const common = {
      groupName: this.props.groupName,
      containerId: this.props.containerId,
      onHover: this.handleHover,
      onMoveOut: this.handleMoveOut
    };
    this.itemsElements = this.state.items.map((item, index) => (
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
    ));
  }

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
    const {className, contentClassName, groupName, preview} = this.props;
    const common = {
      groupName,
      containerId: this.props.containerId,
      onHover: this.handleHover,
      onMoveOut: this.handleMoveOut
    };

    if (preview) {
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
            {this.itemsElements}
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
  preview: PropTypes.bool,
  items: PropTypes.array,
  className: PropTypes.string,
  contentClassName: PropTypes.string
};

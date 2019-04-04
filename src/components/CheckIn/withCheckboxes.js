import React from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const reduceItemsToMap = (items, isSelect = false) => {
  const itemReducer = (accumulator, item) => {
    accumulator[item.id] = isSelect ? item : null;

    return accumulator;
  };

  return items.reduce(itemReducer, {});
};

function withCheckboxes(WrappedComponent) {
  class WithCheckboxes extends React.Component {
    static propTypes = {
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    state = {
      checkedItemsMap: {},
      isAllChecked: false,
    }

    toggleItem = (item) => this.setState(({ checkedItemsMap }) => ({
      checkedItemsMap: {
        ...checkedItemsMap,
        [item.id]: checkedItemsMap[item.id] ? null : item,
      },
      isAllChecked: false,
    }));

    toggleAll = () => this.setState((state, { items }) => {
      return {
        checkedItemsMap: reduceItemsToMap(items, !state.isAllChecked),
        isAllChecked: !state.isAllChecked,
      };
    });

    render() {
      const { checkedItemsMap, isAllChecked } = this.state;
      const checkedItems = Object.values(checkedItemsMap).filter(Boolean);

      return (
        <WrappedComponent
          checkedItems={checkedItems}
          checkedItemsMap={checkedItemsMap}
          isAllChecked={isAllChecked}
          toggleAll={this.toggleAll}
          toggleItem={this.toggleItem}
          {...this.props}
        />
      );
    }
  }
  WithCheckboxes.displayName = `WithCheckboxes(${getDisplayName(WrappedComponent)})`;

  return WithCheckboxes;
}

export default withCheckboxes;

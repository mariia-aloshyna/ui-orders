import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  cloneDeep,
  find,
  get,
} from 'lodash';

import { Callout } from '@folio/stripes/components';

import getLocationsForSelect from '../Utils/getLocationsForSelect';
import { fetchItems } from '../Receiving/util';
import {
  CHECKIN,
  ITEMS,
  LOCATIONS,
} from '../Utils/resources';
import { ITEM_STATUS } from '../Receiving/const';
import CHECKIN_URLS from './const';
import ItemsListModal from './ItemsListModal';
import checkInItems from './util';

class CheckInDetails extends Component {
  static manifest = Object.freeze({
    checkIn: CHECKIN,
    items: ITEMS,
    locations: LOCATIONS,
    query: {},
  })

  static propTypes = {
    close: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    mutator: PropTypes.object,
    pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
    resources: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.callout = React.createRef();

    this.state = {
      isAllChecked: true,
      isLoading: true,
      items: [],
    };
  }

  componentDidMount() {
    const { mutator, pieces } = this.props;

    fetchItems(mutator, pieces).then(itemsMap => {
      const items = pieces.map(item => ({
        ...item,
        barcode: get(itemsMap, [item.itemId, 'barcode'], ''),
        itemStatus: ITEM_STATUS.received,
        isChecked: true,
      }));

      this.setState({
        isLoading: false,
        items,
      });
    });
  }

  toggleItem = (item) => {
    this.setState(state => {
      const items = state.items.map(el => {
        if (el.id === item.id) {
          return {
            ...el,
            isChecked: !el.isChecked,
          };
        }

        return el;
      });

      return {
        isAllChecked: false,
        items,
      };
    });
  }

  toggleAll = () => {
    this.setState((state) => {
      const isAllChecked = !state.isAllChecked;
      const items = state.items.map(item => ({
        ...item,
        isChecked: isAllChecked,
      }));

      return {
        isAllChecked,
        items,
      };
    });
  }

  submitCheckIn = () => {
    const { close, location, mutator } = this.props;
    const checkInItemsList = this.state.items.filter(item => item.isChecked);

    checkInItems(checkInItemsList, mutator.checkIn)
      .then(() => this.callout.current.sendCallout({
        type: 'success',
        message: <FormattedMessage id="ui-orders.checkIn.checkInItem.success" />,
      }))
      .then(() => close())
      .then(() => mutator.query.update({
        _path: location.pathname.replace(CHECKIN_URLS.items, CHECKIN_URLS.history),
      }))
      .catch(() => this.callout.current.sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-orders.checkIn.checkInItem.error" />,
      }));
  }

  onChangeField = (item, value, key) => {
    this.setState((state) => {
      const items = cloneDeep(state.items);
      const selectedItem = find(items, { 'id': item.id });

      selectedItem[key] = value;

      return { items };
    });
  }

  render() {
    const { close, resources } = this.props;
    const { isAllChecked, items, isLoading } = this.state;

    return (
      <React.Fragment>
        <ItemsListModal
          close={close}
          isAllChecked={isAllChecked}
          isLoading={isLoading}
          items={items}
          locations={getLocationsForSelect(resources)}
          onChangeField={this.onChangeField}
          submitCheckIn={this.submitCheckIn}
          toggleAll={this.toggleAll}
          toggleItem={this.toggleItem}
        />
        <Callout ref={this.callout} />
      </React.Fragment>
    );
  }
}

export default CheckInDetails;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';

import OrdersCheckboxFilter from '../common/OrdersCheckboxFilter';
import OrdersDateRangeFilter from '../common/OrdersDateRangeFilter';

import {
  FILTERS,
  STATUS_FILTER_OPTIONS,
  RECEIPT_STATUS_FILTER_OPTIONS,
} from './constants';

class OrdersListFilters extends Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {
    activeFilters: {
      [FILTERS.ASSIGNED_TO]: [],
      [FILTERS.STATUS]: [],
      [FILTERS.RECEIPT_STATUS]: [],
      [FILTERS.DATE_ORDERED]: [],
    },
  };

  render() {
    const { activeFilters, onChange, user } = this.props;
    const assignedToMeOptions = [
      {
        label: `${user.firstName} ${user.lastName}`,
        value: `${user.id}`,
      },
    ];

    return (
      <AccordionSet>
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.ASSIGNED_TO]}
          labelId="ui-orders.assignedToMe"
          name={FILTERS.ASSIGNED_TO}
          onChange={onChange}
          options={assignedToMeOptions}
        />
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.STATUS]}
          labelId="ui-orders.workflowStatus"
          name={FILTERS.STATUS}
          onChange={onChange}
          options={STATUS_FILTER_OPTIONS}
        />
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.RECEIPT_STATUS]}
          labelId="ui-orders.poLine.receiptStatus"
          name={FILTERS.RECEIPT_STATUS}
          onChange={onChange}
          options={RECEIPT_STATUS_FILTER_OPTIONS}
        />
        <OrdersDateRangeFilter
          activeFilters={activeFilters[FILTERS.DATE_ORDERED]}
          labelId="ui-orders.dateOrdered"
          name={FILTERS.DATE_ORDERED}
          onChange={onChange}
        />
      </AccordionSet>
    );
  }
}

export default OrdersListFilters;

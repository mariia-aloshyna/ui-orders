import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import {
  AccordionSet,
} from '@folio/stripes/components';

import OrdersCheckboxFilter from '../common/OrdersCheckboxFilter';
import OrdersDateRangeFilter from '../common/OrdersDateRangeFilter';
import OrdersTextFilter from '../common/OrdersTextFilter';
import VendorFilter from '../common/VendorFilter';
import {
  vendorsShape,
} from '../common/shapes';

import {
  FILTERS,
  STATUS_FILTER_OPTIONS,
  ORDER_TYPE_FILTER_OPTIONS,
  MANUAL_RENEWAL_FILTER_OPTIONS,
} from './constants';

class OrdersListFilters extends Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    vendors: vendorsShape,
    init: PropTypes.func,
  };

  static defaultProps = {
    activeFilters: {
      [FILTERS.STATUS]: [],
      [FILTERS.DATE_ORDERED]: [],
      [FILTERS.ORDER_TYPE]: [],
      [FILTERS.RENEWAL_DATE]: [],
      [FILTERS.MANUAL_RENEWAL]: [],
      [FILTERS.RENEWAL_REVIEW_PERIOD]: [],
      [FILTERS.VENDOR]: [],
    },
    init: noop,
  };

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { activeFilters, onChange, vendors } = this.props;

    return (
      <AccordionSet>
        <OrdersCheckboxFilter
          id={FILTERS.STATUS}
          activeFilters={activeFilters[FILTERS.STATUS]}
          labelId="ui-orders.workflowStatus"
          name={FILTERS.STATUS}
          onChange={onChange}
          options={STATUS_FILTER_OPTIONS}
          closedByDefault={false}
        />
        <OrdersDateRangeFilter
          id={FILTERS.DATE_ORDERED}
          activeFilters={activeFilters[FILTERS.DATE_ORDERED]}
          labelId="ui-orders.dateOrdered"
          name={FILTERS.DATE_ORDERED}
          onChange={onChange}
        />
        <OrdersCheckboxFilter
          id={FILTERS.ORDER_TYPE}
          activeFilters={activeFilters[FILTERS.ORDER_TYPE]}
          labelId="ui-orders.order.orderType"
          name={FILTERS.ORDER_TYPE}
          onChange={onChange}
          options={ORDER_TYPE_FILTER_OPTIONS}
        />
        <VendorFilter
          id={FILTERS.VENDOR}
          activeFilters={activeFilters[FILTERS.VENDOR]}
          labelId="ui-orders.line.accordion.vendor"
          name={FILTERS.VENDOR}
          onChange={onChange}
          vendors={vendors}
        />
        <OrdersDateRangeFilter
          id={FILTERS.RENEWAL_DATE}
          activeFilters={activeFilters[FILTERS.RENEWAL_DATE]}
          labelId="ui-orders.renewal.date"
          name={FILTERS.RENEWAL_DATE}
          onChange={onChange}
        />
        <OrdersCheckboxFilter
          id={FILTERS.MANUAL_RENEWAL}
          activeFilters={activeFilters[FILTERS.MANUAL_RENEWAL]}
          labelId="ui-orders.renewal.manualRenewal"
          name={FILTERS.MANUAL_RENEWAL}
          onChange={onChange}
          options={MANUAL_RENEWAL_FILTER_OPTIONS}
        />
        <OrdersTextFilter
          id={FILTERS.RENEWAL_REVIEW_PERIOD}
          activeFilters={activeFilters[FILTERS.RENEWAL_REVIEW_PERIOD]}
          labelId="ui-orders.renewal.reviewPeriod"
          name={FILTERS.RENEWAL_REVIEW_PERIOD}
          type="number"
          onChange={onChange}
        />
      </AccordionSet>
    );
  }
}

export default OrdersListFilters;

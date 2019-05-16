import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { CheckboxFilter, DateRangeFilter } from '@folio/stripes/smart-components';

import { DATE_FORMAT } from '../common/constants';

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

  createClearFilterHandler = (name) => () => {
    this.props.onChange({ name, values: [] });
  }

  renderCheckboxFilter = (name, labelId, options) => {
    const activeFilters = this.props.activeFilters[name] || [];

    return (
      <Accordion
        displayClearButton={activeFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id={labelId} />}
        onClearFilter={this.createClearFilterHandler(FILTERS.STATUS)}
      >
        <CheckboxFilter
          dataOptions={options}
          name={name}
          onChange={this.props.onChange}
          selectedValues={activeFilters}
        />
      </Accordion>
    );
  }

  retrieveDatesFromDateRangeFilterString = filterValue => {
    let dateRange = {
      startDate: '',
      endDate: '',
    };

    if (filterValue) {
      const [startDate, endDate] = filterValue.split(':');

      dateRange = {
        startDate: moment(startDate).format(DATE_FORMAT) || '',
        endDate: moment(endDate).format(DATE_FORMAT) || '',
      };
    }

    return dateRange;
  }

  makeDateRangeFilterString = (startDate, endDate) => `${startDate}:${endDate}`;

  renderDateOrderedFilter = () => {
    const activeFilters = this.props.activeFilters[FILTERS.DATE_ORDERED] || [];

    return (
      <Accordion
        displayClearButton={activeFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id="ui-orders.dateOrdered" />}
        onClearFilter={this.createClearFilterHandler(FILTERS.DATE_ORDERED)}
      >
        <DateRangeFilter
          name={FILTERS.DATE_ORDERED}
          selectedValues={this.retrieveDatesFromDateRangeFilterString(activeFilters[0])}
          onChange={this.props.onChange}
          makeFilterString={this.makeDateRangeFilterString}
          dateFormat={DATE_FORMAT}
        />
      </Accordion>
    );
  }

  render() {
    const { user } = this.props;
    const assignedToMeOptions = [
      {
        label: `${user.firstName} ${user.lastName}`,
        value: `${user.id}`,
      },
    ];

    return (
      <AccordionSet>
        {this.renderCheckboxFilter(FILTERS.ASSIGNED_TO, 'ui-orders.assignedToMe', assignedToMeOptions)}
        {this.renderCheckboxFilter(FILTERS.STATUS, 'ui-orders.workflowStatus', STATUS_FILTER_OPTIONS)}
        {
          this.renderCheckboxFilter(
            FILTERS.RECEIPT_STATUS,
            'ui-orders.poLine.receiptStatus',
            RECEIPT_STATUS_FILTER_OPTIONS,
          )
        }
        {this.renderDateOrderedFilter()}
      </AccordionSet>
    );
  }
}

export default OrdersListFilters;

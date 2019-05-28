import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';

import { stripesShape } from '@folio/stripes/core';
import { SearchAndSort, makeQueryFunction } from '@folio/stripes/smart-components';

import packageInfo from '../../package';
import OrdersNavigation from '../common/OrdersNavigation';
import {
  ORDER_LINES_ROUTE,
  LINES_API,
  DATE_FORMAT,
} from '../common/constants';
import {
  getActiveFilters,
  handleFilterChange,
} from '../common/utils';
import {
  LOCATIONS,
  MATERIAL_TYPES,
  VENDORS,
  FUNDS,
} from '../components/Utils/resources';
import OrderLinesFilters from './OrderLinesFilters';
import { filterConfig } from './OrdersLinesFilterConfig';
import Details from './Details';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const visibleColumns = ['poLineNumber', 'updatedDate', 'title', 'productIds', 'vendorRefNumber', 'funCodes'];
const resultsFormatter = {
  updatedDate: line => {
    const updatedDate = moment.utc(get(line, 'metadata.updatedDate', ''));

    return updatedDate.isValid() ? updatedDate.format(DATE_FORMAT) : '';
  },
  productIds: line => get(line, 'details.productIds', []).map(product => product.productId).join(' ,'),
  vendorRefNumber: line => get(line, 'vendorDetail.refNumber', ''),
  funCodes: line => get(line, 'fundDistribution', []).map(fund => fund.code).join(' ,'),
};
const columnMapping = {
  poLineNumber: <FormattedMessage id="ui-orders.orderLineList.poLineNumber" />,
  updatedDate: <FormattedMessage id="ui-orders.orderLineList.updatedDate" />,
  title: <FormattedMessage id="ui-orders.orderLineList.title" />,
  productIds: <FormattedMessage id="ui-orders.orderLineList.productIds" />,
  vendorRefNumber: <FormattedMessage id="ui-orders.orderLineList.vendorRefNumber" />,
  funCodes: <FormattedMessage id="ui-orders.orderLineList.funCodes" />,
};
const columnWidths = {
  poLineNumber: '9%',
  updatedDate: '9%',
  title: '32%',
  productIds: '18%',
  vendorRefNumber: '14%',
  funCodes: '18%',
};

class OrderLinesList extends Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'id',
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      throwErrors: false,
      path: LINES_API,
      records: 'poLines',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(title="*%{query.query}*")',
            {
              updatedDate: 'metadata.updatedDate',
              vendorRefNumber: 'vendorDetail.refNumber',
            },
            filterConfig,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    locations: LOCATIONS,
    materialTypes: MATERIAL_TYPES,
    vendors: VENDORS,
    funds: FUNDS,
  });

  static propTypes = {
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
    showSingleResult: PropTypes.bool,
    browseOnly: PropTypes.bool,
    onComponentWillUnmount: PropTypes.func,
  }

  static defaultProps = {
    showSingleResult: true,
    browseOnly: false,
  }

  constructor(props, context) {
    super(props, context);
    this.getActiveFilters = getActiveFilters.bind(this);
    this.handleFilterChange = handleFilterChange.bind(this);
  }

  renderNavigation = () => (
    <OrdersNavigation
      isOrderLines
      queryMutator={this.props.mutator.query}
    />
  );

  renderFilters = (onChange) => {
    const { resources } = this.props;
    const locations = get(resources, 'locations.records', []);
    const vendors = get(resources, 'vendors.records', []);
    const materialTypes = get(resources, 'materialTypes.records', []);

    return (
      <OrderLinesFilters
        activeFilters={this.getActiveFilters()}
        locations={locations}
        materialTypes={materialTypes}
        onChange={onChange}
        queryMutator={this.props.mutator.query}
        vendors={vendors}
      />
    );
  };

  render() {
    const {
      onComponentWillUnmount,
      resources,
      mutator,
      stripes,
      showSingleResult,
      browseOnly,
    } = this.props;

    const correctPackageInfo = {
      ...packageInfo,
      stripes: {
        ...packageInfo.stripes,
        route: ORDER_LINES_ROUTE,
      },
    };

    return (
      <div data-test-order-line-instances>
        <SearchAndSort
          packageInfo={correctPackageInfo}
          objectName="order-line"
          baseRoute={ORDER_LINES_ROUTE}
          visibleColumns={visibleColumns}
          resultsFormatter={resultsFormatter}
          columnMapping={columnMapping}
          columnWidths={columnWidths}
          massageNewRecord={this.massageNewRecord}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          onComponentWillUnmount={onComponentWillUnmount}
          disableRecordCreation
          finishedResourceName="perms"
          viewRecordPerms="orders.po-lines.item.get"
          newRecordPerms="orders.po-lines.item.post"
          parentResources={resources}
          parentMutator={mutator}
          stripes={stripes}
          showSingleResult={showSingleResult}
          browseOnly={browseOnly}
          viewRecordComponent={Details}
          renderFilters={this.renderFilters}
          renderNavigation={this.renderNavigation}
          onFilterChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

export default OrderLinesList;

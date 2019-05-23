import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import { SearchAndSort, makeQueryFunction } from '@folio/stripes/smart-components';

import packageInfo from '../../package';
import OrdersNavigation from '../common/OrdersNavigation';
import {
  ORDER_LINES_ROUTE,
  LINES_API,
} from '../common/constants';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const viewRecordComponent = noop;
const renderFilters = noop;

const visibleColumns = ['title'];

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
            {},
            [],
          ),
        },
        staticFallback: { params: {} },
      },
    },
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

  renderNavigation = () => <OrdersNavigation isOrderLines />;

  render() {
    const {
      onComponentWillUnmount,
      resources,
      mutator,
      stripes,
      showSingleResult,
      browseOnly,
    } = this.props;

    return (
      <div data-test-order-line-instances>
        <SearchAndSort
          packageInfo={packageInfo}
          objectName="order-line"
          baseRoute={ORDER_LINES_ROUTE}
          visibleColumns={visibleColumns}
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
          viewRecordComponent={viewRecordComponent}
          renderFilters={renderFilters}
          renderNavigation={this.renderNavigation}
        />
      </div>
    );
  }
}

export default OrderLinesList;

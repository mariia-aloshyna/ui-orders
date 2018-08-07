import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import { filters2cql } from '@folio/stripes-components/lib/FilterGroups';
import packageInfo from '../../package';
import Panes from '../components/Panes';
import { PO, POForm } from '../components/PO';
import { Filters, SearchableIndexes } from '../Utils/FilterConfig';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const filterConfig = Filters();
const searchableIndexes = SearchableIndexes;

class Main extends Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'po_number'
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      records: 'purchase_orders',
      recordsRequired: '%{resultCount}',
      path: 'purchase_order',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            const sortMap = {
              id: 'id',
              po_number: 'po_number',
              created: 'created',
              comments: 'comments',
              assigned_to: 'assigned_to',
            };

            const index = resourceData.query.qindex ? resourceData.query.qindex : 'all';
            const searchableIndex = searchableIndexes.find(idx => idx.value === index);

            let cql = resourceData.query.query ? searchableIndex.makeQuery(resourceData.query.query) : '(id="*")';
            const filterCql = filters2cql(filterConfig, resourceData.query.filters);
            if (filterCql) {
              if (cql) {
                cql = `(${cql}) and ${filterCql}`;
              } else {
                cql = filterCql;
              }
            }

            const { sort } = resourceData.query;
            if (sort) {
              const sortIndexes = sort.split(',').map((sort1) => {
                let reverse = false;
                if (sort1.startsWith('-')) {
                  // eslint-disable-next-line no-param-reassign
                  sort1 = sort1.substr(1);
                  reverse = true;
                }
                let sortIndex = sortMap[sort1] || sort1;
                if (reverse) {
                  sortIndex = `${sortIndex.replace(' ', '/sort.descending ')}/sort.descending`;
                }
                return sortIndex;
              });

              cql += ` sortby ${sortIndexes.join(' ')}`;
            }
            console.log(cql);
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    // Vendor
    vendorQuery: { initialValue: { query: '' } },
    vendorResultCount: { initialValue: INITIAL_RESULT_COUNT },
    vendor: {
      type: 'okapi',
      clear: true,
      records: 'vendors',
      recordsRequired: '%{vendorResultCount}',
      path: 'vendor',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            let cql = `(name="${resourceData.poLineQuery.query}*")`;
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    // Po Line
    poLineQuery: { initialValue: { query: '' } },
    poLineResultCount: { initialValue: INITIAL_RESULT_COUNT },
    poLine: {
      type: 'okapi',
      clear: true,
      records: 'po_lines',
      recordsRequired: '%{poLineResultCount}',
      path: 'po_line',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            let cql = `(id="${resourceData.poLineQuery.query}*")`;
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    dropdown: { initialValue: {
      acquisitionMethodDD: [
        { value: 'Purchase', label: 'Purchase' },
        { value: 'vendor System', label: 'Vendor System' },
        { value: 'approval', label: 'Approval' },
        { value: 'Depository', label: 'Depository' },
        { value: 'Exchange', label: 'Gift' },
        { value: 'Technical', label: 'Technical '}
      ],
      orderFormatDD: [
        { value: 'Physical Resource', label: 'Physical Resource' },
        { value: 'Electronic Resource', label: 'Electronic Resource' }
      ],
      statusDD: [
        { value: 'Pending', label: 'Pending' },
        { value: 'In Review', label: 'In Review' },
        { value: 'Not Approved Update Required', label: 'Not Approved Update Required' },
        { value: 'Declined', label: 'Declined' },
        { value: 'Cancelled', label: 'Cancelled ' }
      ],
      orderTypeDD: [
        { value: 'One-Time', label: 'One-Time' },
        { value: 'On-Going', label: 'On-Going' },
        { value: 'On-Going Re-encumber', label: 'On-Going Re-encumber' }
      ],
    }}
  });

  static propTypes = {
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      user: PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string,
        }),
      })
    }),
    showSingleResult: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    browseOnly: PropTypes.bool,
    onComponentWillUnmount: PropTypes.func,
    disableRecordCreation: PropTypes.bool
  }

  create = (data) => {
    const { mutator } = this.props;
    mutator.records.POST(data).then(newOrder => {
      mutator.query.update({
        _path: `/orders/view/${newOrder.id}`,
        layer: null
      });
    });
  }

  render() {
    const { browseOnly, showSingleResult, disableRecordCreation, onComponentWillUnmount, stripes: { user: { user: { id } } } } = this.props;
    const resultsFormatter = {
      'po_number': data => _.toString(_.get(data, ['po_number'], '')),
      'created': data => _.toString(_.get(data, ['created'], '')),
      'comments': data => _.toString(_.get(data, ['comments'], '')),
      'assigned_to': data => _.toString(_.get(data, ['assigned_to'], '')),
    };
    const getUser = id || '';
    return (
      <div>
        <SearchAndSort
          packageInfo={packageInfo}
          objectName="orders"
          baseRoute={packageInfo.stripes.route}
          filterConfig={filterConfig}
          visibleColumns={['po_number', 'created', 'comments', 'assigned_to']}
          resultsFormatter={resultsFormatter}
          viewRecordComponent={Panes}
          editRecordComponent={POForm}
          onCreate={this.create}
          newRecordInitialValues={{ created_by: getUser }}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          onComponentWillUnmount={onComponentWillUnmount}
          disableRecordCreation={disableRecordCreation}
          finishedResourceName="perms"
          viewRecordPerms="purchase_order.item.get"
          newRecordPerms="purchase_order.item.post, login.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          showSingleResult={showSingleResult}
          browseOnly={browseOnly}
        />
      </div>
    );
  }

}

export default Main;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import makeQueryFunction from '@folio/stripes-components/util/makeQueryFunction';
import { filters2cql } from '@folio/stripes-components/lib/FilterGroups';
import packageInfo from '../../package';
import Panes from '../components/PurchaseOrder/Panes';
import { PO, POForm } from '../components/PurchaseOrder/PO';
import { Filters, SearchableIndexes } from '../components/Utils/FilterConfig';

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
    // DropDown
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
    }},
    // Users
    usersQuery: { initialValue: { query: '' } },
    usersResultCount: { initialValue: INITIAL_RESULT_COUNT },
    user: {
      type: 'okapi',
      clear: true,
      records: 'users',
      recordsRequired: '%{poLineResultCount}',
      path: 'users',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(username="%{query.query}*" or personal.firstName="%{query.query}*" or personal.lastName="%{query.query}*" or personal.email="%{query.query}*" or barcode="%{query.query}*" or id="%{query.query}*" or externalSystemId="%{query.query}*")',
            {
              'Active': 'active',
              'Name': 'personal.lastName personal.firstName',
              'Patron group': 'patronGroup.group',
              'Username': 'username',
              'Barcode': 'barcode',
              'Email': 'personal.email',
            },
            '',
            '',
          ),
        },
        staticFallback: { params: {} },
      },
    },
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
    console.log(data);
    mutator.records.POST(data).then(newOrder => {
      mutator.query.update({
        _path: `/orders/view/${newOrder.id}`,
        layer: null
      });
    });
  }


  render() {
    const { resources, mutator, stripes, browseOnly, showSingleResult, disableRecordCreation, onComponentWillUnmount, stripes: { user: { user: { id, firstName, lastName } } } } = this.props;
    const resultsFormatter = {
      'po_number': data => _.toString(_.get(data, ['po_number'], '')),
      'created': data => _.toString(_.get(data, ['created'], '')),
      'comments': data => _.toString(_.get(data, ['comments'], '')),
      'assigned_to': data => _.toString(_.get(data, ['assigned_to'], '')),
    };
    const getUserID = id || '';
    const getUserName = `${firstName} ${lastName}` || '';

    return (
      <SearchAndSort
        packageInfo={packageInfo}
        objectName="orders"
        baseRoute={packageInfo.stripes.route}
        filterConfig={filterConfig}
        visibleColumns={['po_number', 'created', 'comments', 'assigned_to']}
        resultsFormatter={resultsFormatter}
        viewRecordComponent={PO}
        editRecordComponent={POForm}
        onCreate={this.create}
        newRecordInitialValues={{ created_by: getUserID, created_by_name: getUserName }}
        initialResultCount={INITIAL_RESULT_COUNT}
        resultCountIncrement={RESULT_COUNT_INCREMENT}
        onComponentWillUnmount={onComponentWillUnmount}
        disableRecordCreation={disableRecordCreation}
        finishedResourceName="perms"
        viewRecordPerms="purchase_order.item.get"
        newRecordPerms="purchase_order.item.post, login.item.post"
        parentResources={resources}
        parentMutator={mutator}
        detailProps={stripes}
        stripes={stripes}
        showSingleResult={showSingleResult}
        browseOnly={browseOnly}
      />
    );
  }

}

export default Main;

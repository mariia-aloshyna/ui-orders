import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { filters2cql } from '@folio/stripes/components';
import { SearchAndSort } from '@folio/stripes/smart-components';
import packageInfo from '../../package';
import Panes from '../components/Panes';
import { POForm } from '../components/PurchaseOrder';
import { Filters, SearchableIndexes } from '../components/Utils/FilterConfig';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const filterConfig = Filters();
const searchableIndexes = SearchableIndexes;

class Main extends Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'id',
      }
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      path: 'orders',
      records: 'composite_purchase_orders',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            /*
              This code is not DRY as it is copied from makeQueryFunction in stripes-components.
              This is necessary, as makeQueryFunction only referneces query paramaters as a data source.
              STRIPES-480 is intended to correct this and allow this query function to be replace with a call
              to makeQueryFunction.
              https://issues.folio.org/browse/STRIPES-480
            */
            const resourceData = args[2];
            const sortMap = {
              'ID': 'id',
              'PO Number': 'po_number',
              'Created By': 'created_by',
              'Comments': 'comments',
              'Assigned To': 'assigned_to'
            };

            const index = resourceData.query.qindex ? resourceData.query.qindex : 'all';
            const searchableIndex = searchableIndexes.find(idx => idx.value === index);

            let cql = searchableIndex.makeQuery(resourceData.query.query);
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
          }
        },
        staticFallback: { params: {} },
      },
    },
    // Po Line
    queryII: {
      initialValue: {
        poLine: '',
        vendorID: '',
        userID: ''
      }
    },
    poLine: {
      type: 'okapi',
      clear: true,
      path: 'po_line',
      records: 'po_lines',
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            const cql = `(purchase_order_id="${resourceData.queryII.poLine}*")`;
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    vendor: {
      type: 'okapi',
      path: 'vendor',
      records: 'vendors',
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            const cql = `(id="${resourceData.queryII.vendorID}")`;
            return cql;
          }
        },
        limit: 1,
        staticFallback: { params: {} },
      },
    },
    user: {
      type: 'okapi',
      path: 'users',
      records: 'users',
      GET: {
        params: {
          query: (...args) => {
            const resourceData = args[2];
            const cql = `(id="${resourceData.queryII.userID}")`;
            return cql;
          }
        },
        limit: 1,
        staticFallback: { params: {} },
      },
    },
    // DropDown
    dropdown: {
      initialValue: {
        acquisitionMethodDD: [
          { value: '', label: '--- Select ---' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b1', label: 'Purchase' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b2', label: 'Vendor System' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b3', label: 'Approval' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b4', label: 'Depository' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b5', label: 'Gift' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b6', label: 'Technical ' }
        ],
        orderFormatDD: [
          { value: '', label: '--- Select ---' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b7', label: 'Physical Resource' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b8', label: 'Electronic Resource' }
        ],
        statusDD: [
          { value: '', label: '--- Select ---' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d5529b9', label: 'Pending' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552910', label: 'In Review' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552911', label: 'Not Approved Update Required' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552912', label: 'Declined' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552913', label: 'Cancelled ' }
        ],
        orderTypeDD: [
          { value: '', label: '--- Select ---' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552914', label: 'One-Time' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552915', label: 'On-Going' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552916', label: 'On-Going Re-encumber' }
        ],
        sourceDD: [
          { value: '', label: '--- Select ---' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552917', label: 'Source 1' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552918', label: 'Source 2' },
          { value: '5e62ebaf-bb56-495e-a5ae-dda48d552919', label: 'Source 3' }
        ],
      },
    },
    workflowStatus: {
      type: 'okapi',
      path: 'workflow_status?query=cql.allRecords=1 sortby desc',
      records: 'workflow_statuses',
    },
    receiptStatus: {
      type: 'okapi',
      path: 'receipt_status?query=cql.allRecords=1 sortby desc',
      records: 'receipt_statuses',
    },
    source: {
      type: 'okapi',
      path: 'source?query=cql.allRecords=1 sortby desc',
      records: 'sources',
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

  static defaultProps = {
    showSingleResult: true,
    browseOnly: false,
  }

  static getDerivedStateFromProps(props) {
    const assignedTo = filterConfig.find(group => group.name === 'assigned_to');
    if (assignedTo.values.length === 0) {
      const user = props.stripes.user.user;
      assignedTo.values.push({
        name: `${user.firstName} ${user.lastName}`,
        cql: `${user.id}`,
      });
      props.mutator.initializedFilterConfig.replace(true);
    }

    return null;
  }

  create = (data) => {
    const { mutator } = this.props;
    const deep = _.cloneDeep(data);
    delete deep.created_by_name;
    delete deep.assigned_to_user;
    delete deep.vendor_name;

    mutator.records.POST(deep).then(newOrder => {
      mutator.query.update({
        _path: `/orders/view/${newOrder.id}`,
        layer: null
      });
    });
  }

  render() {
    const { resources, mutator, stripes, browseOnly, showSingleResult, disableRecordCreation, onComponentWillUnmount, stripes: { user: { user: { id, firstName, lastName } } } } = this.props;
    const resultsFormatter = {
      'po_number': data => _.toString(_.get(data, ['purchase_order', 'po_number'], '')),
      'created': data => _.toString(_.get(data, ['purchase_order', 'created'], '')),
      'comments': data => _.toString(_.get(data, ['purchase_order', 'comments'], '')),
      'assigned_to': data => _.toString(_.get(data, ['purchase_order', 'assigned_to'], '')),
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
        viewRecordComponent={Panes}
        editRecordComponent={POForm}
        onCreate={this.create}
        newRecordInitialValues={{ created_by: getUserID, created_by_name: getUserName }}
        initialResultCount={INITIAL_RESULT_COUNT}
        resultCountIncrement={RESULT_COUNT_INCREMENT}
        onComponentWillUnmount={onComponentWillUnmount}
        disableRecordCreation={disableRecordCreation}
        finishedResourceName="perms"
        viewRecordPerms="purchase_order.item.get"
        newRecordPerms="purchase_order.item.post"
        parentResources={resources}
        parentMutator={mutator}
        detailProps={Object.assign({ onUpdateAssignedTo: this.onUpdateAssignedTo }, stripes)}
        stripes={stripes}
        showSingleResult={showSingleResult}
        browseOnly={browseOnly}
      />
    );
  }
}

export default Main;

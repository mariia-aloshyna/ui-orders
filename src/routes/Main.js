import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  filters2cql,
  Callout,
} from '@folio/stripes/components';
import { SearchAndSort } from '@folio/stripes/smart-components';

import packageInfo from '../../package';
import {
  CONFIG_CLOSING_REASONS,
  CONFIG_ORDER_NUMBER,
  MODULE_ORDERS,
} from '../components/Utils/const';
import Panes from '../components/Panes';
import { POForm } from '../components/PurchaseOrder';
import { Filters, SearchableIndexes } from '../components/Utils/FilterConfig';
import FolioFormattedTime from '../components/FolioFormattedTime';
import { createOrderResource } from '../components/Utils/orderResource';
import {
  CONFIG_API,
  ORDER_NUMBER_API,
  ORDER_NUMBER_VALIDATE_API,
  ORDERS_API,
} from '../components/Utils/api';

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
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      throwErrors: false,
      path: ORDERS_API,
      records: 'purchase_orders',
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
              'Assigned To': 'assigned_to',
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
          },
        },
        staticFallback: { params: {} },
      },
    },
    vendors: {
      type: 'okapi',
      path: 'vendor',
      records: 'vendors',
      perRequest: 1000,
    },
    users: {
      type: 'okapi',
      path: 'users',
      records: 'users',
      perRequest: 1000,
    },
    fund: {
      type: 'okapi',
      path: 'fund',
      records: 'funds',
      perRequest: 1000,
    },
    materialTypes: {
      type: 'okapi',
      path: 'material-types',
      records: 'mtypes',
      perRequest: 1000,
    },
    closingReasons: {
      type: 'okapi',
      path: CONFIG_API,
      GET: {
        params: {
          query: `(module=${MODULE_ORDERS} and configName=${CONFIG_CLOSING_REASONS})`,
        },
      },
      records: 'configs',
    },
    orderNumberSetting: {
      type: 'okapi',
      records: 'configs',
      path: CONFIG_API,
      GET: {
        params: {
          query: `(module=${MODULE_ORDERS} and configName=${CONFIG_ORDER_NUMBER})`,
        },
      },
    },
    orderNumber: {
      accumulate: true,
      fetch: false,
      path: ORDER_NUMBER_API,
      throwErrors: false,
      clientGeneratePk: false,
      type: 'okapi',
      POST: {
        path: ORDER_NUMBER_VALIDATE_API,
      },
    },
    // source: {
    //   type: 'okapi',
    //   path: 'source',
    //   records: 'sources',
    //   perRequest: 1000,
    // },
  });

  static propTypes = {
    mutator: PropTypes.shape({
      initializedFilterConfig: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      records: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      orderNumber: PropTypes.shape({
        GET: PropTypes.func,
        POST: PropTypes.func,
        reset: PropTypes.func,
      }),
    }).isRequired,
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      user: PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }),
    showSingleResult: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    browseOnly: PropTypes.bool,
    onComponentWillUnmount: PropTypes.func,
    disableRecordCreation: PropTypes.bool,
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  create = async (order) => {
    const { mutator } = this.props;

    try {
      const newOrder = await createOrderResource(order, mutator.records);

      mutator.query.update({
        _path: `/orders/view/${newOrder.id}`,
        layer: null,
      });
    } catch (e) {
      this.callout.sendCallout({
        message: <FormattedMessage id="ui-orders.errors.noCreatedOrder" />,
        type: 'error',
      });
    }
  }

  createCalloutRef = ref => {
    this.callout = ref;
  };

  render() {
    const {
      browseOnly,
      disableRecordCreation,
      mutator,
      onComponentWillUnmount,
      resources,
      showSingleResult,
      stripes,
      stripes: {
        user: {
          user: {
            firstName,
            lastName,
          },
        },
      },
    } = this.props;
    const users = get(resources, 'users.records', []);
    const resultsFormatter = {
      'po_number': order => get(order, 'po_number', ''),
      'created': order => <FolioFormattedTime dateString={get(order, 'metadata.createdDate')} />,
      'notes': order => get(order, 'notes', []).join(', '),
      'assigned_to': order => {
        const assignedToId = get(order, 'assigned_to', '');
        const assignedTo = users.find(d => d.id === assignedToId);

        return assignedTo && assignedTo.personal
          ? `${assignedTo.personal.firstName} ${assignedTo.personal.lastName}`
          : '';
      },
      'workflow_status': order => get(order, 'workflow_status', ''),
    };
    const newRecordInitialValues = {
      created_by_name: `${firstName} ${lastName}` || '',
    };

    return (
      <div data-test-order-instances>
        <SearchAndSort
          packageInfo={packageInfo}
          objectName="order"
          baseRoute={packageInfo.stripes.route}
          filterConfig={filterConfig}
          visibleColumns={['po_number', 'workflow_status', 'created', 'notes', 'assigned_to']}
          resultsFormatter={resultsFormatter}
          viewRecordComponent={Panes}
          editRecordComponent={POForm}
          onCreate={this.create}
          massageNewRecord={this.massageNewRecord}
          newRecordInitialValues={newRecordInitialValues}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          onComponentWillUnmount={onComponentWillUnmount}
          disableRecordCreation={disableRecordCreation}
          finishedResourceName="perms"
          viewRecordPerms="purchase_order.item.get"
          newRecordPerms="purchase_order.item.post"
          parentResources={resources}
          parentMutator={mutator}
          detailProps={{ onUpdateAssignedTo: this.onUpdateAssignedTo }}
          stripes={stripes}
          showSingleResult={showSingleResult}
          browseOnly={browseOnly}
          columnMapping={{
            po_number: <FormattedMessage id="ui-orders.order.po_number" />,
            created: <FormattedMessage id="ui-orders.order.created" />,
            notes: <FormattedMessage id="ui-orders.order.notes" />,
            assigned_to: <FormattedMessage id="ui-orders.order.assigned_to" />,
            workflow_status: <FormattedMessage id="ui-orders.order.workflow_status" />,
          }}
        />
        <Callout ref={this.createCalloutRef} />
      </div>
    );
  }
}

export default Main;

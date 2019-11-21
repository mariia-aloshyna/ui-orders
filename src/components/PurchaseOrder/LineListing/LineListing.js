import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import { withRouter } from 'react-router-dom';

import { MultiColumnList } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';
import {
  baseManifest,
  fundsManifest,
} from '@folio/stripes-acq-components';

import {
  LINES_API,
} from '../../Utils/api';

const INITIAL_RESULT_COUNT = 10;
const RESULT_COUNT_INCREMENT = 10;

function LineListing({ baseUrl, mutator, resources }) {
  const onSelectRow = useCallback((e, meta) => {
    const _path = `${baseUrl}/po-line/view/${meta.id}`;

    mutator.query.update({ _path });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const linesResultCount = get(resources, 'linesResultCount', INITIAL_RESULT_COUNT);
  const onNeedMore = useCallback(() => {
    mutator.linesResultCount.replace(linesResultCount + RESULT_COUNT_INCREMENT);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linesResultCount]);

  const poLines = get(resources, 'lines.records', []);
  const funds = get(resources, 'funds.records', []);
  const fundsMap = funds.reduce((acc, fund) => {
    acc[fund.id] = fund.code;

    return acc;
  }, {});

  const resultsFormatter = {
    'poLineNumber': ({ poLineNumber }) => poLineNumber,
    'title': ({ title }) => title || '',
    'productId': item => map(get(item, 'details.productIds', []), 'productId').join(', '),
    'vendorRefNumber': item => get(item, 'vendorDetail.refNumber', ''),
    'fundCode': item => get(item, 'fundDistribution', []).map(fund => fundsMap[fund.fundId]).join(', '),
  };

  const heightAttrs = poLines.length > INITIAL_RESULT_COUNT
    ? {
      height: 350,
      virtualize: true,
    }
    : {};

  return (
    <div>
      <MultiColumnList
        columnMapping={{
          poLineNumber: <FormattedMessage id="ui-orders.poLine.number" />,
          title: <FormattedMessage id="ui-orders.lineListing.title" />,
          productId: <FormattedMessage id="ui-orders.lineListing.productId" />,
          vendorRefNumber: <FormattedMessage id="ui-orders.lineListing.vendorRefNumber" />,
          fundCode: <FormattedMessage id="ui-orders.lineListing.fundCode" />,
        }}
        contentData={poLines}
        formatter={resultsFormatter}
        loading={get(resources, 'lines.isPending', true) || get(resources, 'funds.isPending', true)}
        onNeedMoreData={onNeedMore}
        onRowClick={onSelectRow}
        sortDirection="ascending"
        sortedColumn="poLineNumber"
        sortOrder="poLineNumber"
        visibleColumns={['poLineNumber', 'title', 'productId', 'vendorRefNumber', 'fundCode']}
        {...heightAttrs}
      />
    </div>
  );
}

LineListing.manifest = Object.freeze({
  funds: fundsManifest,
  linesResultCount: { initialValue: INITIAL_RESULT_COUNT },
  lines: {
    ...baseManifest,
    recordsRequired: '%{linesResultCount}',
    path: LINES_API,
    perRequest: RESULT_COUNT_INCREMENT,
    records: 'poLines',
    GET: {
      params: {
        query: 'purchaseOrderId==":{id}" sortby poLineNumber',
      },
    },
  },
  query: {},
});

LineListing.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(LineListing));

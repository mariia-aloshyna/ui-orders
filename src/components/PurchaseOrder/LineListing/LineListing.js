import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import { MultiColumnList } from '@folio/stripes/components';

class LineListing extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    poLines: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  onSelectRow = (e, meta) => {
    const { match, history } = this.props;
    const url = match.url;

    history.push(`${url}/po-line/view/${meta.id}`);
  };

  render() {
    const { poLines } = this.props;
    const resultsFormatter = {
      'poLineNumber': ({ poLineNumber }) => poLineNumber || '',
      'title': ({ title }) => title || '',
      'productId': item => map(get(item, 'details.productIds', []), 'productId').join(', '),
      'vendorRefNumber': item => get(item, 'vendorDetail.refNumber', ''),
      'fundCode': item => map(get(item, 'fundDistribution', []), 'code').join(', '),
    };

    return (
      <div>
        <MultiColumnList
          contentData={poLines}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          sortedColumn="poLineNumber"
          sortDirection="ascending"
          visibleColumns={['poLineNumber', 'title', 'productId', 'vendorRefNumber', 'fundCode']}
          columnMapping={{
            poLineNumber: <FormattedMessage id="ui-orders.lineListing.lineNumber" />,
            title: <FormattedMessage id="ui-orders.lineListing.title" />,
            productId: <FormattedMessage id="ui-orders.lineListing.productId" />,
            vendorRefNumber: <FormattedMessage id="ui-orders.lineListing.vendorRefNumber" />,
            fundCode: <FormattedMessage id="ui-orders.lineListing.fundCode" />,
          }}
        />
      </div>
    );
  }
}

export default LineListing;

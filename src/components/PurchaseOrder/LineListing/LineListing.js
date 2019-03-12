import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';
import { MultiColumnList } from '@folio/stripes/components';

class LineListing extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    poLines: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  onSelectRow = (e, meta) => {
    const { match, history } = this.props;
    const url = match.url;

    history.push(`${url}/po-line/view/${meta.id}`);
  }

  render() {
    const { poLines } = this.props;
    const resultsFormatter = {
      'poLineNumber': item => toString(get(item, ['poLineNumber'], '')),
      'acquisitionMethod': item => toString(get(item, ['acquisitionMethod'], '')),
      'owner': item => toString(get(item, ['owner'], '')),
      'poLineDescription': item => toString(get(item, ['poLineDescription'], '')),
    };

    return (
      <div>
        <MultiColumnList
          contentData={poLines}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          visibleColumns={['poLineNumber', 'acquisitionMethod', 'owner', 'poLineDescription']}
          columnMapping={{
            poLineNumber: <FormattedMessage id="ui-orders.lineListing.lineNumber" />,
            acquisitionMethod: <FormattedMessage id="ui-orders.lineListing.acquisitionMethod" />,
            owner: <FormattedMessage id="ui-orders.lineListing.owner" />,
            poLineDescription: <FormattedMessage id="ui-orders.lineListing.lineDescription" />,
          }}
        />
      </div>
    );
  }
}

export default LineListing;

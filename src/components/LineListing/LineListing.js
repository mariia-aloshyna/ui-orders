import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import POLineData from '../../Utils/POLineData';


class LineListing extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  onSelectRow = (e, meta) => {
    const { match, history } = this.props;
    const url = match.url;
    history.push(`${url}/po-line/view/${meta.id}`);
  }

  render() {
    const catalogResults = POLineData;
    const resultsFormatter = {
      'po_line_id': item => _.toString(_.get(item, ['po_line_id'], '')),
      'acquisition_method': item => _.toString(_.get(item, ['acquisition_method'], '')),
    };

    return (
      <div>
        <MultiColumnList
          contentData={catalogResults}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          visibleColumns={['po_line_id', 'acquisition_method']}
          columnMapping={{
            po_line_id: 'ID',
            acquisition_method: 'Acquisition Method'
          }}
        />
      </div>
    );
  }
}

export default LineListing;

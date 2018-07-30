import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

class LineListing extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.object,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectRow = this.onSelectRow.bind(this);
    this.getPOLineData = this.getPOLineData.bind(this);
  }

  onSelectRow = (e, meta) => {
    const { match, history } = this.props;
    const url = match.url;
    history.push(`${url}/po-line/view/${meta.id}`);
  }

  getPOLineData() {
    const { parentResources } = this.props;
    const poLine = (parentResources.poLine || {}).records || [];
    if (!poLine || poLine.length === 0) return [];
    return poLine;
  }

  render() {
    const resultsFormatter = {
      'barcode': item => _.toString(_.get(item, ['barcode'], '')),
      'acquisition_method': item => _.toString(_.get(item, ['acquisition_method'], '')),
      'owner': item => _.toString(_.get(item, ['owner'], '')),
      'po_line_description': item => _.toString(_.get(item, ['po_line_description'], '')),
    };

    return (
      <div>
        <MultiColumnList
          contentData={this.getPOLineData()}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          visibleColumns={['barcode', 'acquisition_method', 'owner', 'po_line_description']}
          columnMapping={{
            barcode: 'Barcode',
            acquisition_method: 'Acquisition Method',
            owner: 'Owner',
            po_line_description: 'PO Line Description'
          }}
        />
      </div>
    );
  }
}

export default LineListing;

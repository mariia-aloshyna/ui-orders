import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList } from '@folio/stripes/components';

class LineListing extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, parentResources, match: { params: { id } } } = props;
    const ID = id;
    const poLineData = (parentResources.poLine || {}).records || [];
    if (ID !== state.ID || !_.isEqual(poLineData, state.poLineData)) {
      parentMutator.queryII.update({ poLine: ID });
      return { poLineData, ID };
    }
    return null;
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
    const resultsFormatter = {
      'po_line_number': item => _.toString(_.get(item, ['po_line_number'], '')),
      'barcode': item => _.toString(_.get(item, ['barcode'], '')),
      'acquisition_method': item => _.toString(_.get(item, ['acquisition_method'], '')),
      'owner': item => _.toString(_.get(item, ['owner'], '')),
      'po_line_description': item => _.toString(_.get(item, ['po_line_description'], '')),
    };
    return (
      <div>
        <MultiColumnList
          contentData={this.state.poLineData}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          visibleColumns={['po_line_number', 'barcode', 'acquisition_method', 'owner', 'po_line_description']}
          columnMapping={{
            po_line_number: 'PO Line Number',
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

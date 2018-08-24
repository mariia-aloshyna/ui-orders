import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

class LocationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const fundDistribution = [
      {
        "name": 'History',
        "quantity_physical": 1,
        "quantity_electronic": 1.4
      },
      {
        "name": 'History',
        "quantity_physical": 2,
        "quantity_electronic": 2.3
      }
    ];

    const resultsFormatter = {
      'name': data => _.toString(_.get(data, ['name'], '')),
      'quantity_electronic': data => _.toString(_.get(data, ['quantity_electronic'], '')),
      'quantity_physical': data => _.toString(_.get(data, ['quantity_physical'], ''))
    };

    return (
      <MultiColumnList
        contentData={fundDistribution}
        resultsFormatter={resultsFormatter}
        // onRowClick={this.onSelectRow}
        visibleColumns={['name', 'quantity_electronic', 'quantity_physical']}
      />
    );
  }
}

export default LocationView;

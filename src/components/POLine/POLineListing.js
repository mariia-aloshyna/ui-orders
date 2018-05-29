import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';

class POLineListing extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  // constructor(props) {
  //   super(props);
  //   // this.getPODetails = this.getPODetails.bind(this);
  // }

  render() {
    return (
      <div>
        <p>Test</p>
      </div>
    );
  }
}

export default POLineListing;

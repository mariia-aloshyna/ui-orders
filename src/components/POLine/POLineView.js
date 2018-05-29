import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import css from './POLineView.css';

class PODetailsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.getPODetails = this.getPODetails.bind(this);
  }

  getPODetails(val, key) {
    const rowCount = this.props.initialValues.contacts.length - 1 !== key;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Vendor" value={_.get(val, 'vendor')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="PO Number" value={_.get(val, 'po_number')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Assigned To" value={_.get(val, 'assigned_to')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Created On" value={FormatDate(_.toString(_.get(val, 'created')))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Created By" value={FormatDate(_.toString(_.get(val, 'created_by')))} />
        </Col>
      </Row>
    );
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.agreements.length >= 1 ? initialValues.agreements : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getPODetails)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No PO Details Available --</p>
        </div>
      );
    }
  }
}

export default PODetailsView;

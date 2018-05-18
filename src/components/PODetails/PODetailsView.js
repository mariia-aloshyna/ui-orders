import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import css from './PODetailsView.css';

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
          <KeyValue label="Approval Status" value={_.get(val, 'approval_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Comments" value={_.get(val, 'comments')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Reference URL" value={FormatDate(_.get(val, 'reference_url'))} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={_.get(val, 'notes')} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
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

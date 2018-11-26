import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

class ContributorView extends Component {
  static propTypes = {
    contributors: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
    this.getContributorName = this.getContributorName.bind(this);
  }

  getContributorName(val, key) {
    return (
      <Row key={key}>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.itemDetails.contributor" />}
            value={get(val, 'contributor')}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const { contributors } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {contributors.map(this.getContributorName)}
        </Col>
      </Row>
    );
  }
}

export default ContributorView;

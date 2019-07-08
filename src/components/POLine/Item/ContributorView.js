import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { find, get } from 'lodash';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

class ContributorView extends Component {
  static propTypes = {
    contributors: PropTypes.arrayOf(PropTypes.object),
    contributorNameTypes: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    contributors: [],
  }

  constructor(props) {
    super(props);
    this.getContributorName = this.getContributorName.bind(this);
  }

  getContributorName(val, key) {
    return (
      <Row key={key}>
        <Col
          xs={6}
          lg={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-orders.itemDetails.contributor" />}
            value={get(val, 'contributor')}
          />
        </Col>
        <Col
          xs={6}
          lg={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-orders.itemDetails.contributorType" />}
            value={get(val, 'contributorType')}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const { contributors, contributorNameTypes } = this.props;
    const contributorsToDisplay = contributors.map(({ contributor, contributorNameTypeId }) => ({
      contributor,
      contributorType: get(find(contributorNameTypes, { id: contributorNameTypeId }), 'name', ''),
    }));

    return (
      <Row>
        <Col xs={12}>
          {contributorsToDisplay.map(this.getContributorName)}
        </Col>
      </Row>
    );
  }
}

ContributorView.defaultProps = {
  contributorNameTypes: [],
};

export default ContributorView;

import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button } from '@folio/stripes/components';

import CloseOrderModalForm from './CloseOrderModalForm';

class CloseOrderModal extends Component {
  static propTypes = {
    orderId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };
  }

  openModal = () => {
    this.setState({
      openModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const { orderId } = this.props;

    return (
      <Fragment>
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={this.openModal}
          style={{ marginRight: '10px' }}
        >
          <FormattedMessage id="ui-orders.paneBlock.closeBtn" />
        </Button>
        <CloseOrderModalForm
          close={this.closeModal}
          orderId={orderId}
          open={this.state.openModal}
        />
      </Fragment>
    );
  }
}

export default CloseOrderModal;

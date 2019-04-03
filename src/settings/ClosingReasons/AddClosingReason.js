import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';

import ClosingReasonForm from './ClosingReasonForm';

class AddClosingReason extends PureComponent {
  static propTypes = {
    saveReason: PropTypes.func.isRequired,
  };

  state = {
    isAdding: false,
  };

  saveReason = async (values) => {
    await this.props.saveReason(null, values.value);
    this.toggleAddMode();
  };

  toggleAddMode = () => {
    this.setState(prevState => ({
      isAdding: !prevState.isAdding,
    }));
  };

  render() {
    const { isAdding } = this.state;

    return (
      <Row data-test-add-closign-reason>
        <Col xs={12}>
          {
            isAdding ? (
              <ClosingReasonForm
                form="add-new-closing-reason"
                onSubmit={this.saveReason}
                cancel={this.toggleAddMode}
              />
            ) : (
              <Button
                onClick={this.toggleAddMode}
                data-test-add-closign-reason-btn
              >
                <FormattedMessage id="ui-orders.settings.closingReasons.addBtn" />
              </Button>
            )
          }
        </Col>
      </Row>
    );
  }
}

export default AddClosingReason;

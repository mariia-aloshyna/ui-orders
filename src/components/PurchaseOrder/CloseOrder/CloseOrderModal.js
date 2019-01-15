import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  Col,
  Modal,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';

import css from './CloseOrderModal.css';

const DEFAULT_REASONS = {
  ceased: 'Ceased',
  transferred: 'Transferred to another publisher',
  merged: 'Merged with another title',
  split: 'Split into other titles',
  lackOfFunds: 'Lack of funds',
  lackOfUse: 'Lack of use',
  dublication: 'Duplication',
  unresponsiveVendor: 'Unresponsive vendor',
  licensingTerms: 'Licensing terms (unacceptable)',
  lowQuality: 'Low quality',
  unpreferredFormat: 'Unpreferred format',
  error: 'Error',
  titleWontBePublishedThisYear: 'Title won’t be published this year',
  titleWontBePublished: 'Title won’t be published',
  titleOutOtPrint: 'Title is out of print',
  titleRecievedAsGift: 'Title received as a gift',
};

class CloseOrderModal extends Component {
  static propTypes = {
    orderNumber: PropTypes.string,
    closingReasons: PropTypes.arrayOf(PropTypes.object),
    closeOrder: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      reason: '',
      note: '',
    };
  }

  reasonChanged = (e) => {
    this.setState({ reason: e.target.value });
  }

  noteChanged = (e) => {
    this.setState({ note: e.target.value });
  }

  render() {
    const { orderNumber, closingReasons, closeOrder, cancel } = this.props;
    const reasons = closingReasons.map((reason) => ({
      label: reason.value,
      value: reason.value,
    }));

    return (
      <Modal
        label={<FormattedMessage id="ui-orders.closeOrderModal.title" values={{ orderNumber }} />}
        open
      >
        <Row>
          <Col xs={12}>
            <Select
              autoFocus
              label={<FormattedMessage id="ui-orders.closeOrderModal.reason" />}
              dataOptions={reasons}
              onChange={this.reasonChanged}
              placeholder=" "
              defaultValue=""
            >
              {Object.keys(DEFAULT_REASONS).map((key) => (
                <FormattedMessage
                  id={`ui-orders.closeOrderModal.closingReasons.${key}`}
                  key={key}
                >
                  {(message) => <option value={DEFAULT_REASONS[key]}>{message}</option>}
                </FormattedMessage>
              ))}
            </Select>
            <TextArea
              label={<FormattedMessage id="ui-orders.closeOrderModal.notes" />}
              onChange={this.noteChanged}
            />
          </Col>
        </Row>
        <Row>
          <Col
            className={css.buttonsLine}
            xs={12}
          >
            <Button
              buttonStyle="primary"
              disabled={!this.state.reason}
              onClick={() => closeOrder(this.state.reason, this.state.note)}
            >
              <FormattedMessage id="ui-orders.closeOrderModal.submit" />
            </Button>
            <Button onClick={cancel}>
              <FormattedMessage id="ui-orders.closeOrderModal.cancel" />
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default CloseOrderModal;

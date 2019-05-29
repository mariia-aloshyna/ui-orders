import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  Button,
} from '@folio/stripes/components';

import ClosingReasonForm from './ClosingReasonForm';
import css from './ClosingReasonItem.css';

class ClosingReasonItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    isSystem: PropTypes.bool,
    saveReason: PropTypes.func.isRequired,
    removeReason: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: '',
    value: '',
    isSystem: true,
  };

  state = {
    isEdit: false,
  };

  toggleItemMode = () => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
    }));
  };

  saveReason = async (values) => {
    await this.props.saveReason(this.props.id, values.value);
    this.toggleItemMode();
  };

  removeReason = async () => {
    await this.props.removeReason(this.props.id);
  }

  render() {
    const { value, isSystem, id } = this.props;
    const { isEdit } = this.state;

    return (
      <div
        className={css.closingReasonItem}
        data-test-closing-reason-item
        data-test-closing-reason-item-system={isSystem}
      >
        {
          isEdit ? (
            <ClosingReasonForm
              form={id}
              onSubmit={this.saveReason}
              initialValues={{ value }}
              cancel={this.toggleItemMode}
            />
          ) : (
            <Row>
              <Col xs={6}>
                {value}
              </Col>
              <Col xs={2}>
                <FormattedMessage id={`ui-orders.settings.closingReasons.${isSystem ? 'System' : 'User'}`} />
              </Col>
              {
                !isSystem && (
                  <Col
                    xs={4}
                    data-test-closing-reason-item-actions
                  >
                    <Button
                      onClick={this.toggleItemMode}
                      marginBottom0
                      data-test-closing-reason-item-edit
                    >
                      <FormattedMessage id="ui-orders.settings.closingReasons.editBtn" />
                    </Button>
                    <Button
                      onClick={this.removeReason}
                      marginBottom0
                      data-test-closing-reason-item-remove
                    >
                      <FormattedMessage id="ui-orders.settings.closingReasons.removeBtn" />
                    </Button>
                  </Col>
                )
              }
            </Row>
          )
        }
      </div>
    );
  }
}

export default ClosingReasonItem;

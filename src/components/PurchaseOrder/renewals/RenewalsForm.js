import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  TextField,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../Utils/const';
import { required } from '../../Utils/Validate';
import { isWorkflowStatusOpen } from '../util';

const RenewalsForm = ({ order }) => {
  const isOpenedOrder = isWorkflowStatusOpen(order);

  return (
    <Row>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={TextField}
          fullWidth
          label={<FormattedMessage id="ui-orders.renewals.renewalInterval" />}
          name="renewal.interval"
          type="number"
          validate={required}
          disabled={isOpenedOrder}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          backendDateStandard={DATE_FORMAT}
          component={Datepicker}
          dateFormat={DATE_FORMAT}
          fullWidth
          label={<FormattedMessage id="ui-orders.renewals.renewalDate" />}
          name="renewal.renewalDate"
          timeZone={TIMEZONE}
          validate={required}
          disabled={isOpenedOrder}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={TextField}
          fullWidth
          label={<FormattedMessage id="ui-orders.renewals.reviewPeriod" />}
          name="renewal.reviewPeriod"
          type="number"
          disabled={isOpenedOrder}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={Checkbox}
          fullWidth
          label={<FormattedMessage id="ui-orders.renewals.manualRenewal" />}
          name="renewal.manualRenewal"
          type="checkbox"
          disabled={isOpenedOrder}
        />
      </Col>
    </Row>
  );
};

RenewalsForm.propTypes = {
  order: PropTypes.object.isRequired,
};

export default RenewalsForm;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
  propTypes,
} from 'redux-form';

import {
  Button,
  Col,
  Pane,
  Row,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

const CODE_PREFIX = 'CLOSING_REASON_';

const addReason = (fields) => {
  const lastReason = fields.get(fields.length - 1) || { code: `${CODE_PREFIX}0` };
  const lastReasonCodeInt = +lastReason.code.split('_').pop();
  const code = `${CODE_PREFIX}${lastReasonCodeInt + 1}`;

  fields.push({
    module: 'ORDERS',
    configName: 'order.closing-reasons',
    code,
  });
};

const renderReasons = ({ fields, removeReason, saveReason, meta: { pristine } }) => (
  <Fragment>
    {fields.map((reason, index) => (
      <Row key={index}>
        <Col xs={5}>
          <Field
            name={`${reason}.value`}
            type="text"
            component={TextField}
          />
        </Col>
        <Col
          xs={7}
          lg={3}
        >
          <Button
            disabled={pristine}
            onClick={() => saveReason(fields.get(index))}
          >
            <FormattedMessage id="ui-orders.settings.closingReasons.saveBtn" />
          </Button>
          <Button
            buttonStyle="danger"
            onClick={() => {
              const item = fields.get(index);

              return item.id ? removeReason(item) : fields.remove(index);
            }}
          >
            <FormattedMessage id="ui-orders.settings.closingReasons.removeBtn" />
          </Button>
        </Col>
      </Row>
    ))}
    <Row>
      <Col xs={12}>
        <Button onClick={() => addReason(fields)}>
          <FormattedMessage id="ui-orders.settings.closingReasons.addBtn" />
        </Button>
      </Col>
    </Row>
  </Fragment>
);

renderReasons.propTypes = {
  fields: propTypes.FieldArray,
  meta: PropTypes.object,
  removeReason: PropTypes.func,
  saveReason: PropTypes.func,
};

const ClosingReasonsForm = ({ title, removeReason, saveReason }) => (
  <Pane
    defaultWidth="100%"
    fluidContentWidth
    paneTitle={title}
  >
    <FieldArray
      name="records"
      component={renderReasons}
      removeReason={removeReason}
      saveReason={saveReason}
    />
  </Pane>
);

ClosingReasonsForm.propTypes = {
  removeReason: PropTypes.func,
  saveReason: PropTypes.func,
  title: PropTypes.node.isRequired,
};

export default stripesForm({
  form: 'closing-reasons',
  navigationCheck: true,
  enableReinitialize: true,
})(ClosingReasonsForm);

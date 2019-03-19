import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Col,
  KeyValue,
  RepeatableField,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import parseNumber from '../../Utils/parseNumber';
import { Required } from '../../Utils/Validate';
import calculateEstimatedPrice from '../calculateEstimatedPrice';

class FundDistributionForm extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    funds: PropTypes.arrayOf(PropTypes.object),
  };

  calculateAmount = (fund) => {
    const formValues = this.props.formValues;
    const estimatedPrice = calculateEstimatedPrice(formValues);
    const fundDistributionPercentage = fund.percentage || 0;
    const amount = ((fundDistributionPercentage / 100) * estimatedPrice).toFixed(2);

    return amount;
  };

  renderSubForm = (elem, index, fields) => {
    const { funds } = this.props;
    const fund = fields.get(index);
    const amount = this.calculateAmount(fund);

    return (
      <React.Fragment>
        <Col xs={4}>
          <Field
            component={Select}
            dataOptions={funds}
            fullWidth
            label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
            name={`${elem}.code`}
            placeholder=" "
            required
            validate={[Required]}
          />
        </Col>
        <Col xs={2}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.fundDistribution.percent" />}
            name={`${elem}.percentage`}
            parse={parseNumber}
            type="number"
            validate={[Required]}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.code" />}
            value={fund.code}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.amount" />}
            value={amount}
          />
        </Col>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray
            addLabel={<FormattedMessage id="ui-orders.fundDistribution.addBtn" />}
            component={RepeatableField}
            name="fundDistribution"
            renderField={this.renderSubForm}
          />
        </Col>
      </Row>
    );
  }
}

export default FundDistributionForm;

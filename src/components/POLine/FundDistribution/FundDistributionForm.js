import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';
import { FieldsFundDistribution } from '../../../common/POLFields';

const FundDistributionForm = ({ order, funds, formValues }) => {
  const isOpenedOrder = isWorkflowStatusOpen(order);

  return (
    <Row>
      <Col xs={12}>
        <FieldsFundDistribution
          disabled={isOpenedOrder}
          funds={funds}
          formValues={formValues}
        />
      </Col>
    </Row>
  );
};

FundDistributionForm.propTypes = {
  formValues: PropTypes.object,
  funds: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.object.isRequired,
};

export default FundDistributionForm;

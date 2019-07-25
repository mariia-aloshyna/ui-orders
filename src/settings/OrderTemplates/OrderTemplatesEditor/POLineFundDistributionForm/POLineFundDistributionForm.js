import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import { FieldsFundDistribution } from '../../../../common/POLFields';

const POLineFundDistributionForm = ({ formValues, funds }) => {
  return (
    <Row start="xs">
      <Col xs={12}>
        <FieldsFundDistribution
          funds={funds}
          formValues={formValues}
          required={false}
        />
      </Col>
    </Row>
  );
};

POLineFundDistributionForm.propTypes = {
  funds: PropTypes.arrayOf(PropTypes.object),
  formValues: PropTypes.object.isRequired,
};

export default POLineFundDistributionForm;

import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import { FieldsLocation } from '../../../../common/POLFields';

const POLineLocationsForm = ({ locations }) => {
  return (
    <Row start="xs">
      <Col xs={12}>
        <FieldsLocation
          locations={locations}
          withValidation={false}
        />
      </Col>
    </Row>
  );
};

POLineLocationsForm.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
};

export default POLineLocationsForm;

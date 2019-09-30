import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldMaterialSupplier,
  FieldMaterialType,
  FieldReceiptDue,
  FieldExpectedReceiptDate,
} from '../../../../common/POLFields';
import InventoryRecordTypeSelectField from '../../../InventoryRecordTypeSelectField';

const POLineOtherResourcesForm = ({ materialTypes, vendors }) => {
  return (
    <Fragment>
      <Row>
        <Col
          xs={3}
          data-col-order-template-other-resources-material-supplier
        >
          <FieldMaterialSupplier vendors={vendors} />
        </Col>

        <Col
          xs={3}
          data-col-order-template-other-resources-receipt-due
        >
          <FieldReceiptDue />
        </Col>

        <Col
          xs={3}
          data-col-order-template-other-resources-expected-receipt-date
        >
          <FieldExpectedReceiptDate />
        </Col>

        <Col xs={3}>
          <InventoryRecordTypeSelectField
            label="ui-orders.physical.createInventory"
            name="physical.createInventory"
          />
        </Col>

        <Col
          xs={3}
          data-col-order-template-other-resources-material-type
        >
          <FieldMaterialType
            materialTypes={materialTypes}
            name="physical.materialType"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

POLineOtherResourcesForm.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default POLineOtherResourcesForm;

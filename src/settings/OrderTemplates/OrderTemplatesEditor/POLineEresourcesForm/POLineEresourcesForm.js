import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldAccessProvider,
  FieldMaterialType,
  FieldActivated,
  FieldTrial,
  FieldUserLimit,
  FieldExpectedActivation,
  FieldActivationDue,
} from '../../../../common/POLFields';
import InventoryRecordTypeSelectField from '../../../InventoryRecordTypeSelectField';

const POLineEresourcesForm = ({ materialTypes, vendors }) => {
  return (
    <Row>
      <Col
        xs={3}
        data-col-order-template-eresources-access-provider
      >
        <FieldAccessProvider
          vendors={vendors}
          required={false}
        />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-material-type
      >
        <FieldMaterialType
          materialTypes={materialTypes}
          name="eresource.materialType"
        />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-activation-due
      >
        <FieldActivationDue />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-extected-activation
      >
        <FieldExpectedActivation />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-create-inventory
      >
        <InventoryRecordTypeSelectField
          label="ui-orders.eresource.createInventory"
          name="eresource.createInventory"
          required={false}
        />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-user-limit
      >
        <FieldUserLimit />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-activated
      >
        <FieldActivated />
      </Col>

      <Col
        xs={3}
        data-col-order-template-eresources-trial
      >
        <FieldTrial />
      </Col>
    </Row>
  );
};

POLineEresourcesForm.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default POLineEresourcesForm;

import React from 'react';
import PropTypes from 'prop-types';

import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';
import getLocationsForSelect from '../../Utils/getLocationsForSelect';
import { FieldsLocation } from '../../../common/POLFields';

const LocationForm = ({ order, parentResources }) => {
  const isOpenedOrder = isWorkflowStatusOpen(order);

  return (
    <FieldsLocation
      locations={getLocationsForSelect(parentResources)}
      disabled={isOpenedOrder}
    />
  );
};

LocationForm.propTypes = {
  parentResources: PropTypes.object,
  order: PropTypes.object.isRequired,
};

export default LocationForm;

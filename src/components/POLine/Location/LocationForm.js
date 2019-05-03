import React from 'react';
import {
  Field,
  FieldArray,
} from 'redux-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Select,
  TextField,
} from '@folio/stripes/components';

import getLocationsForSelect from '../../Utils/getLocationsForSelect';
import { required } from '../../Utils/Validate';
import { RepeatableFieldWithErrorMessage } from '../../../common/RepeatableFieldWithErrorMessage/RepeatableFieldWithErrorMessage';
import {
  isLocationsRequired,
  parseQuantity,
  validateLocation,
  validateNotNegative, validateQuantityElectronic,
  validateQuantityPhysical,
} from './validate';

const LocationForm = ({ parentResources }) => (
  <FieldArray
    addLabel={<FormattedMessage id="ui-orders.location.button.addLocation" />}
    component={RepeatableFieldWithErrorMessage}
    name="locations"
    validate={isLocationsRequired}
    renderField={(field) => (
      <React.Fragment>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={getLocationsForSelect(parentResources)}
            fullWidth
            label={<FormattedMessage id="ui-orders.location.nameCode" />}
            name={`${field}.locationId`}
            placeholder=" "
            required
            validate={[required, validateLocation]}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-orders.location.quantityPhysical" />}
            name={`${field}.quantityPhysical`}
            parse={parseQuantity}
            type="number"
            validate={[validateNotNegative, validateQuantityPhysical]}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-orders.location.quantityElectronic" />}
            name={`${field}.quantityElectronic`}
            parse={parseQuantity}
            type="number"
            validate={[validateNotNegative, validateQuantityElectronic]}
          />
        </Col>
      </React.Fragment>
    )}
  />
);

LocationForm.propTypes = {
  parentResources: PropTypes.object,
};

export default LocationForm;

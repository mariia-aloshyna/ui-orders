import React from 'react';
import {
  Field,
  FieldArray,
} from 'redux-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Col,
  RepeatableField,
  Select,
  TextField,
} from '@folio/stripes/components';

import getLocationsForSelect from '../../Utils/getLocationsForSelect';
import { required } from '../../Utils/Validate';

const reduceLocations = (locations, propName) => {
  const reducer = (accumulator, d) => accumulator + (d[propName] || 0);

  return locations.reduce(reducer, 0);
};

const validateQuantityPhysical = (value, { cost, locations = [] }) => {
  const allLocationsQuantity = reduceLocations(locations, 'quantityPhysical');
  const overallLineQuantity = get(cost, 'quantityPhysical', 0);

  return allLocationsQuantity <= overallLineQuantity
    ? undefined
    : <FormattedMessage id="ui-orders.location.quantityPhysical.exceeds" />;
};

const validateQuantityElectronic = (value, { cost, locations = [] }) => {
  const allLocationsQuantity = reduceLocations(locations, 'quantityElectronic');
  const overallLineQuantity = get(cost, 'quantityElectronic', 0);

  return allLocationsQuantity <= overallLineQuantity
    ? undefined
    : <FormattedMessage id="ui-orders.location.quantityElectronic.exceeds" />;
};

const parseQuantity = (value) => {
  return value ? Number(value) : 0;
};

const LocationForm = ({ parentResources }) => (
  <FieldArray
    addLabel={<FormattedMessage id="ui-orders.location.button.addLocation" />}
    component={RepeatableField}
    name="locations"
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
            validate={required}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-orders.location.quantityPhysical" />}
            name={`${field}.quantityPhysical`}
            parse={parseQuantity}
            type="number"
            validate={validateQuantityPhysical}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-orders.location.quantityElectronic" />}
            name={`${field}.quantityElectronic`}
            parse={parseQuantity}
            type="number"
            validate={validateQuantityElectronic}
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

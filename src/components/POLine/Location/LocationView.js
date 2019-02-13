import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { filter, get } from 'lodash';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const Location = ({ location, parentResources }) => {
  const filteredLocation = filter(get(parentResources, 'locations.records', []), { id: location.location_id });
  const { name, code } = get(filteredLocation, '0', {});

  return (
    <Row>
      <Col md={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.location.nameCode" />}
          value={`${name} (${code})`}
        />
      </Col>
      <Col md={3}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.location.quantityPhysical" />}
          value={location.quantity_physical}
        />
      </Col>
      <Col md={3}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.location.quantityElectronic" />}
          value={location.quantity_electronic}
        />
      </Col>
    </Row>
  );
};

const LocationView = ({ parentResources, locations = [] }) => {
  return locations.map((location, i) => (
    <Location
      key={location.id || i}  // i is required when new row of Location is added by User
      location={location}
      parentResources={parentResources}
    />
  ));
};

Location.propTypes = {
  location: PropTypes.object,
  parentResources: PropTypes.object,
};

LocationView.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  parentResources: PropTypes.object,
};

export default LocationView;

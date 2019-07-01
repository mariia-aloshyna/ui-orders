import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelection } from '@folio/stripes-acq-components';

import { Required } from '../../components/Utils/Validate';

const FieldVendor = ({ vendors }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
      name="vendor"
      required
      validate={[Required]}
    />
  );
};

FieldVendor.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FieldVendor;

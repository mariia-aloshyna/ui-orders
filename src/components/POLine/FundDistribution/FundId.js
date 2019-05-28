import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  get,
  toString,
} from 'lodash';

import { KeyValue } from '@folio/stripes/components';

const FundId = ({ funds = [], fundDistribution }) => {
  const value = toString(
    fundDistribution.map((fundOpt) => get(funds.find((fund) => fund.code === fundOpt.code), 'name', '')),
  );

  return (
    <KeyValue
      label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
      value={value}
    />
  );
};

FundId.propTypes = {
  funds: PropTypes.arrayOf(PropTypes.object),
  fundDistribution: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FundId;

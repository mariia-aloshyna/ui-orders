import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  get,
  toString,
} from 'lodash';
import PropTypes from 'prop-types';
import { KeyValue } from '@folio/stripes/components';

const FundId = ({ funds, fundId }) => {
  const fundDetails = get(funds, 'records', []);
  const value = toString(
    fundId.map((fundOpt) => get(fundDetails.find((fund) => fund.id === fundOpt.id), 'name', ''))
  );

  return (
    <KeyValue
      label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
      value={value}
    />
  );
};

FundId.propTypes = {
  funds: PropTypes.object,
  fundId: PropTypes.arrayOf(PropTypes.object),
};

export default FundId;

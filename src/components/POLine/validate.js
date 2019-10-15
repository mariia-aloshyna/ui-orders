import { validateFundDistribution } from '@folio/stripes-acq-components';

import calculateEstimatedPrice from './calculateEstimatedPrice';

function validate(values) {
  const errors = {};
  const totalAmount = calculateEstimatedPrice(values);
  const fundDistributionErrors = validateFundDistribution(values.fundDistribution, totalAmount);

  if (fundDistributionErrors) errors.fundDistribution = fundDistributionErrors;

  return errors;
}

export default validate;

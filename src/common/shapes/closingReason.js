import PropTypes from 'prop-types';

export const closingReasonShape = PropTypes.shape({
  value: PropTypes.string,
});

export const closingReasonsShape = PropTypes.arrayOf(closingReasonShape);

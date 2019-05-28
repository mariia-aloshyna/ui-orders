import PropTypes from 'prop-types';

export const vendorShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
});

export const vendorsShape = PropTypes.arrayOf(vendorShape);

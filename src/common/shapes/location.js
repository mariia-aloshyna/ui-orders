import PropTypes from 'prop-types';

export const locationShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
});

export const locationsShape = PropTypes.arrayOf(locationShape);

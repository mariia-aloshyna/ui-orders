import PropTypes from 'prop-types';

export const materialTypeShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

export const materialTypesShape = PropTypes.arrayOf(materialTypeShape);

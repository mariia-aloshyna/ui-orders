import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  id: PropTypes.string,
  personal: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
});

export const usersShape = PropTypes.arrayOf(userShape);

import PropTypes from 'prop-types';

export const lineMutatorShape = PropTypes.shape({
  GET: PropTypes.func.isRequired,
  POST: PropTypes.func,
  PUT: PropTypes.func,
  DELETE: PropTypes.func,
  reset: PropTypes.func,
});

export const orderNumberMutatorShape = PropTypes.shape({
  GET: PropTypes.func,
  POST: PropTypes.func,
  reset: PropTypes.func,
});

export const orderRecordsMutatorShape = PropTypes.shape({
  POST: PropTypes.func,
  PUT: PropTypes.func,
  DELETE: PropTypes.func,
});

import PropTypes from 'prop-types';

export const STANDARD_MUTATOR = PropTypes.shape({
  DELETE: PropTypes.func,
  POST: PropTypes.func,
  PUT: PropTypes.func,
});

export const EXTENDED_MUTATOR = PropTypes.shape({
  DELETE: PropTypes.func,
  GET: PropTypes.func.isRequired,
  POST: PropTypes.func,
  PUT: PropTypes.func,
  reset: PropTypes.func,
});

export const lineMutatorShape = EXTENDED_MUTATOR;

export const orderNumberMutatorShape = EXTENDED_MUTATOR;

export const orderRecordsMutatorShape = STANDARD_MUTATOR;

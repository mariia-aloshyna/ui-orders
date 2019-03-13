import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.pieces)) {
      return {
        receivingHistory: json.pieces,
        totalRecords: json.pieces.length,
      };
    }

    return json.pieces;
  },
});

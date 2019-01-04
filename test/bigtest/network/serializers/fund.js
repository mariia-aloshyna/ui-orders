import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.funds)) {
      return {
        funds: json.funds,
        totalRecords: json.funds.length,
      };
    }

    return json.funds;
  },
});

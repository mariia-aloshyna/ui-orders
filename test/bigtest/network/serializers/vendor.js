import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.vendors)) {
      return {
        organizations: json.vendors,
        totalRecords: json.vendors.length,
      };
    }

    return json.vendors;
  },
});

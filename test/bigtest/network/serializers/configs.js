import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.configs)) {
      return {
        configs: json.configs,
        totalRecords: json.configs.length,
      };
    }

    return json.configs;
  },
});

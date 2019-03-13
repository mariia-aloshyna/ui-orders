import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.lines)) {
      return {
        poLines: json.lines,
        totalRecords: json.lines.length,
      };
    }

    return json.lines;
  },
});

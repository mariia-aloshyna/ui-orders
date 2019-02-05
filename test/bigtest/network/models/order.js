import { Model, hasMany } from '@bigtest/mirage';

export default Model.extend({
  compositePoLines: hasMany('line'),
});

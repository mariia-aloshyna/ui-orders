import { Model, hasMany } from '@bigtest/mirage';

export default Model.extend({
  compositePoLines: hasMany('po_line', { inverse: 'purchase_order' }),
});

import { Model, hasMany } from '@bigtest/mirage';

export default Model.extend({
  po_lines: hasMany('po_line', { inverse: 'purchase_order' }),
});

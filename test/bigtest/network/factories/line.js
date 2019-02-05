import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  po_line_number: (id) => `${id}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}-${id}`,
  metadata: () => ({
    createdDate: faker.date.past(),
  }),
});

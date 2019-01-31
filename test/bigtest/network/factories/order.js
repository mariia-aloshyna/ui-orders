import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  po_number: (id) => `${id}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}`,
  metadata: () => ({
    createdDate: faker.date.past(),
  }),
  notes: (id) => [`Order ${id}`],
});

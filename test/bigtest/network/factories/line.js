import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  purchaseOrderId: faker.random.uuid,
  poLineNumber: (id) => `${id}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}-${id}`,
  metadata: () => ({
    createdDate: faker.date.past(),
    lastUpdated: faker.date.past(),
  }),
});

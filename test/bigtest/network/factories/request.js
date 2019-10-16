import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  itemId: faker.random.uuid,
  item: {
    title: faker.finance.accountName,
  },
  status: 'Open',
});

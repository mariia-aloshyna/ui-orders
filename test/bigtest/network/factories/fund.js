import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  code: faker.company.companySuffix,
  id: faker.random.uuid,
  name: faker.finance.accountName,
});

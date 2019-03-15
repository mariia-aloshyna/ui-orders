import {
  Factory,
  faker,
} from '@bigtest/mirage';

import { ITEM_STATUS } from '../../../../src/components/Receiving/const';

export default Factory.extend({
  id: faker.random.uuid,
  barcode: faker.random.numeric,
  status: () => ({
    name: ITEM_STATUS.onOrder,
  }),
});

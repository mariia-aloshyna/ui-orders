import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  poLineId: 'e9009acb-5e89-40b7-8b07-6d565f567778',
  poLineNumber: '1000-1',
  title: (id) => `Piece - ${id}`,
  dateOrdered: () => faker.date.past(),
  receivingNote: (poLineNumber) => `POLine Number: ${poLineNumber}`,
  receivingStatus: 'Expected',
});

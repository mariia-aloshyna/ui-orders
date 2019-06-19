import { get } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getUserOptions = (users = []) => users.map(user => ({
  value: user.id,
  label: `${get(user, ['personal', 'firstName'], '')} ${get(user, ['personal', 'lastName'], '')}`,
}));

import React from 'react';

import OrdersSelectionFilter from '../OrdersSelectionFilter';
import { getUserOptions } from '../utils';
import { usersShape } from '../shapes';

const UserFilter = ({ users, ...rest }) => {
  const options = getUserOptions(users);

  return (
    <OrdersSelectionFilter
      {...rest}
      options={options}
    />
  );
};

UserFilter.propTypes = {
  users: usersShape,
};

export default UserFilter;

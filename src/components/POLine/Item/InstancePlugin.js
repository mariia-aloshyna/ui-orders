import React from 'react';
import PropTypes from 'prop-types';

import { Pluggable } from '@folio/stripes/core';

const InstancePlugin = ({ addInstance }) => {
  return (
    <Pluggable
      aria-haspopup="true"
      dataKey="instances"
      searchButtonStyle="default"
      searchLabel="+"
      selectInstance={addInstance}
      type="find-instance"
    >
      <span>[no instance-selection plugin]</span>
    </Pluggable>
  );
};

InstancePlugin.propTypes = {
  addInstance: PropTypes.func.isRequired,
};

export default InstancePlugin;

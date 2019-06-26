import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pluggable,
  withStripes,
  stripesShape,
} from '@folio/stripes/core';

const columnMapping = {
  title: <FormattedMessage id="ui-orders.instance.title" />,
  contributors: <FormattedMessage id="ui-orders.instance.contributors" />,
  publishers: <FormattedMessage id="ui-orders.instance.publishers" />,
};

const InstancePlugin = ({ addInstance, stripes }) => {
  return (
    <Pluggable
      aria-haspopup="true"
      columnMapping={columnMapping}
      dataKey="instances"
      disableRecordCreation
      searchButtonStyle="default"
      searchLabel="+"
      selectInstance={addInstance}
      stripes={stripes}
      type="find-instance"
      visibleColumns={['title', 'contributors', 'publishers']}
    >
      <span>[no instance-selection plugin]</span>
    </Pluggable>
  );
};

InstancePlugin.propTypes = {
  stripes: stripesShape.isRequired,
  addInstance: PropTypes.func.isRequired,
};

export default withStripes(InstancePlugin);

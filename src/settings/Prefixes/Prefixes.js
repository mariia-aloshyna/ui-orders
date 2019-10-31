import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MODULE_ORDERS,
  CONFIG_PREFIXES,
} from '../../components/Utils/const';

import OrderNumberModifier, { getOrderNumberModifierManifest } from '../OrderNumberModifier';

const objectLabel = <FormattedMessage id="ui-orders.settings.prefix" />;

const Prefixes = ({ stripes, resources, mutator }) => {
  return (
    <OrderNumberModifier
      stripes={stripes}
      resources={resources}
      mutator={mutator}
      moduleName={MODULE_ORDERS}
      configName={CONFIG_PREFIXES}
      objectLabel={objectLabel}
      labelId="ui-orders.settings.poNumber.prefixes"
      labelSingularId="ui-orders.settings.poNumber.prefix"
    />
  );
};

Prefixes.manifest = getOrderNumberModifierManifest(MODULE_ORDERS, CONFIG_PREFIXES);

Prefixes.propTypes = {
  stripes: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default Prefixes;

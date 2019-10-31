import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MODULE_ORDERS,
  CONFIG_SUFFIXES,
} from '../../components/Utils/const';

import OrderNumberModifier, { getOrderNumberModifierManifest } from '../OrderNumberModifier';

const objectLabel = <FormattedMessage id="ui-orders.settings.suffix" />;

const Suffixes = ({ stripes, resources, mutator }) => {
  return (
    <OrderNumberModifier
      stripes={stripes}
      resources={resources}
      mutator={mutator}
      moduleName={MODULE_ORDERS}
      configName={CONFIG_SUFFIXES}
      objectLabel={objectLabel}
      labelId="ui-orders.settings.poNumber.suffixes"
      labelSingularId="ui-orders.settings.poNumber.suffix"
    />
  );
};

Suffixes.manifest = getOrderNumberModifierManifest(MODULE_ORDERS, CONFIG_SUFFIXES);

Suffixes.propTypes = {
  stripes: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default Suffixes;

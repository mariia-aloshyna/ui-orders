import React from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { Accordion } from '@folio/stripes/components';

import {
  INVOICES,
  ORDER_INVOICES,
} from '../../Utils/resources';

import POInvoices from './POInvoices';

const POInvoicesContainer = ({ label, accordionId, resources, vendors }) => {
  const orderInvoices = get(resources, ['invoices', 'records'], []);

  return (
    <Accordion
      label={label}
      id={accordionId}
    >
      <POInvoices
        orderInvoices={orderInvoices}
        vendors={vendors}
      />
    </Accordion>
  );
};

POInvoicesContainer.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  orderId: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
  accordionId: PropTypes.string.isRequired,
  mutator: PropTypes.shape({
    orderInvoicesRelns: PropTypes.object.isRequired,
    invoices: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.object.isRequired,
  vendors: PropTypes.arrayOf(PropTypes.object),
};

POInvoicesContainer.defaultProps = {
  vendors: [],
};

POInvoicesContainer.manifest = Object.freeze({
  orderInvoicesRelns: {
    ...ORDER_INVOICES,
    params: {
      query: 'purchaseOrderId==!{orderId}',
    },
  },
  invoices: {
    ...INVOICES,
    params: {
      query: (queryParams, pathComponents, resourceData, logger, props) => {
        const orderInvoicesRelns = get(props, ['resources', 'orderInvoicesRelns', 'records'], []);
        const invoicesIds = orderInvoicesRelns.map(item => item.invoiceId);

        return invoicesIds.length ? invoicesIds.map(id => `id==${id}`).join(' or ') : 'id==null';
      },
    },
  },
});

export default stripesConnect(POInvoicesContainer);

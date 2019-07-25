import React from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { Accordion } from '@folio/stripes/components';

import {
  INVOICE_LINES,
  INVOICES,
  RECEIVING_HISTORY,
} from '../../Utils/resources';

import POLineInvoices from './POLineInvoices';

const POLineInvoicesContainer = ({
  accordionId,
  label,
  resources,
  vendors,
}) => {
  const lineInvoices = get(resources, ['invoices', 'records'], []);
  const invoiceLines = get(resources, ['invoiceLines', 'records'], []);
  const pieces = get(resources, ['pieces', 'records'], []);

  return (
    <Accordion
      label={label}
      id={accordionId}
    >
      <POLineInvoices
        lineInvoices={lineInvoices}
        invoiceLines={invoiceLines}
        pieces={pieces}
        vendors={vendors}
      />
    </Accordion>
  );
};

POLineInvoicesContainer.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  lineId: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
  accordionId: PropTypes.string.isRequired,
  mutator: PropTypes.shape({
    pieces: PropTypes.object.isRequired,
    invoices: PropTypes.object.isRequired,
    invoiceLines: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.object.isRequired,
  vendors: PropTypes.arrayOf(PropTypes.object),
};

POLineInvoicesContainer.defaultProps = {
  vendors: [],
};

POLineInvoicesContainer.manifest = Object.freeze({
  pieces: {
    ...RECEIVING_HISTORY,
    fetch: true,
    accumulate: false,
    params: {
      query: 'checkin==true and poLineId==!{lineId}',
    },
  },
  invoiceLines: {
    ...INVOICE_LINES,
    params: {
      query: 'poLineId==!{lineId}',
    },
  },
  invoices: {
    ...INVOICES,
    params: {
      query: (queryParams, pathComponents, resourceData, logger, props) => {
        const invoiceLines = get(props, ['resources', 'invoiceLines', 'records'], []);
        const invoicesIds = invoiceLines.map(item => item.invoiceId);

        return invoicesIds.length ? invoicesIds.map(id => `id==${id}`).join(' or ') : 'id==null';
      },
    },
  },
});

export default stripesConnect(POLineInvoicesContainer);

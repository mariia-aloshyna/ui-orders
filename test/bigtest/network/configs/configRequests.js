import { createGetAll } from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { REQUESTS_API } from '../../../../src/components/Utils/api';

const SCHEMA_NAME = 'requests';

function configRequests(server) {
  server.get(REQUESTS_API, createGetAll(SCHEMA_NAME));
}

export default configRequests;

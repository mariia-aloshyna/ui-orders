import { get } from 'lodash';

export default (state, initialValues) => {
  const { instanceId, title, publisher, publicationDate, edition, contributors, productIds } = state;

  return {
    instanceId: instanceId || get(initialValues, 'instanceId', ''),
    title: title || get(initialValues, 'title', ''),
    publisher: publisher || get(initialValues, 'publisher', ''),
    publicationDate: publicationDate || get(initialValues, 'publicationDate', ''),
    edition: edition || get(initialValues, 'edition', ''),
    contributors: contributors.length
      ? contributors
      : get(initialValues, 'contributors', []),
    productIds: productIds.length
      ? productIds
      : get(initialValues, 'details.productIds', []),
  };
};

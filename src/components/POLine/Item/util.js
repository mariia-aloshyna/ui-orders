import {
  find,
  get,
  isEqual,
} from 'lodash';

export const getInventoryData = (state, initialValues) => {
  const { title, publisher, publicationDate, edition, contributors, productIds } = state;

  return {
    instanceId: get(state, 'instanceId', null) || get(initialValues, 'instanceId', null),
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

export const checkInstanceIdField = (formValues, inventoryData) => {
  const isEqualContributors = inventoryData.contributors.every(el => {
    const contributor = find(get(formValues, 'contributors', []), { 'contributor': el.contributor });

    return contributor ? isEqual(contributor, el) : false;
  });
  const isEqualProductIds = inventoryData.productIds.every(el => {
    const productId = find(get(formValues, 'details.productIds', []), { 'productId': el.productId });

    return productId ? isEqual(productId, el) : false;
  });

  return (
    inventoryData.instanceId
    && (inventoryData.title === get(formValues, 'title', ''))
    && (inventoryData.publisher === get(formValues, 'publisher', ''))
    && (inventoryData.publicationDate === get(formValues, 'publicationDate', ''))
    && (inventoryData.edition === get(formValues, 'edition', ''))
    && isEqualContributors
    && isEqualProductIds
  );
};

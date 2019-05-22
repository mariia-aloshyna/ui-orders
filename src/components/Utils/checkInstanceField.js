import {
  find,
  get,
  isEqual,
} from 'lodash';

export default (formValues, inventoryData) => {
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

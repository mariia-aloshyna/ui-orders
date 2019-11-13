/* eslint-disable import/prefer-default-export */
export const getReferredEntityData = (state) => {
  return state
    ? {
      name: state.entityName,
      type: state.entityType,
      id: state.entityId,
    }
    : null;
};

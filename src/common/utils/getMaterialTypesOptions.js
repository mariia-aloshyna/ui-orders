// eslint-disable-next-line import/prefer-default-export
export const getMaterialTypesOptions = (materialTypes = []) => materialTypes.map(materialType => ({
  value: materialType.id,
  label: materialType.name,
}));

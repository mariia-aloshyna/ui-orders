import { sortBy } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getSettingsList = (configs) => {
  const settingsList = (configs || []).map(({ value }) => {
    try {
      const name = JSON.parse(value).name;

      return {
        label: name,
        value: name,
      };
    } catch (e) {
      return undefined;
    }
  }).filter(setting => setting);

  return sortBy(settingsList, 'label');
};

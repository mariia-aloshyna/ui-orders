import { get } from 'lodash';

const getOrderNumberSetting = (configs) => {
  let orderNumberSetting = get(configs, [0, 'value'], '{}');
  const config = {
    canUserEditOrderNumber: false,
  };

  try {
    orderNumberSetting = JSON.parse(orderNumberSetting);
  } catch (e) {
    orderNumberSetting = {};
  }

  Object.assign(config, orderNumberSetting);

  return config;
};

export default getOrderNumberSetting;

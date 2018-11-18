import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import GeneralSettings from './general-settings';
import SomeFeatureSettings from './some-feature-settings';

export default class OrdersSettings extends React.Component {
  pages = [
    {
      route: 'general',
      label: <FormattedMessage id="ui-orders.settings.general" />,
      component: GeneralSettings,
    },
    {
      route: 'somefeature',
      label: <FormattedMessage id="ui-orders.settings.some-feature" />,
      component: SomeFeatureSettings,
    },
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle="ui-orders" />
    );
  }
}

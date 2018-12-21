import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import POLinesLimit from './POLinesLimit';
import ClosingReasons from './ClosingReasons';

class OrdersSettings extends Component {
  constructor(props) {
    super(props);

    this.pages = [
      {
        component: POLinesLimit,
        label: <FormattedMessage id="ui-orders.settings.polines-limit" />,
        route: 'polines-limit',
      },
      {
        component: ClosingReasons,
        label: <FormattedMessage id="ui-orders.settings.closingReasons" />,
        route: 'closing-reasons',
      },
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-orders.settings.index.paneTitle" />}
      />
    );
  }
}

export default OrdersSettings;

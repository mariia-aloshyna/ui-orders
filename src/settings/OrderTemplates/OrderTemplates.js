import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesShape } from '@folio/stripes/core';

import {
  SUFFIXES_SETTING,
  PREFIXES_SETTING,
} from '../../components/Utils/resources';
import OrderTemplatesList from './OrderTemplatesList';
import OrderTemplatesEditorContainer from './OrderTemplatesEditor';

class OrderTemplates extends Component {
  static manifest = Object.freeze({
    prefixesSetting: PREFIXES_SETTING,
    suffixesSetting: SUFFIXES_SETTING,
  });

  static propTypes = {
    label: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);

    const { stripes } = props;

    this.connectedOrderTemplatesEditor = stripes.connect(OrderTemplatesEditorContainer);
  }

  closePane = () => {
    const { history, match: { path } } = this.props;

    history.push(path);
  }

  render() {
    const { label, match: { path } } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <OrderTemplatesList
              label={label}
              rootPath={path}
            />
          )}
        />
        <Route
          exact
          path={`${path}/create`}
          render={() => (
            <this.connectedOrderTemplatesEditor
              close={this.closePane}
            />
          )}
        />
      </Switch>
    );
  }
}

export default OrderTemplates;

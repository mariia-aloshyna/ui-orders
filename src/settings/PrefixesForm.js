import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  change,
  Field,
  getFormValues,
} from 'redux-form';

import { get } from 'lodash';

import {
  Col,
  MultiSelection,
  Row,
} from '@folio/stripes/components';

const PREFIXES_FORM_NAME = 'configForm';

class PrefixesForm extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      store: PropTypes.shape({ dispatch: PropTypes.func.isRequired }).isRequired,
    }).isRequired,
  };

  addValue = (inputValue, fieldName) => {
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
    const list = this.getOptionsList(fieldName);
    const newList = [...list, newOption];
    const { stripes: { store: { dispatch } } } = this.props;

    dispatch(change(PREFIXES_FORM_NAME, fieldName, newList));
  }

  addPrefix = ({ inputValue }) => this.addValue(inputValue, 'selectedItems');

  renderOption = ({ filterValue, exactMatch }) => {
    if (exactMatch || !filterValue) {
      return null;
    } else {
      return (
        <div>
          <FormattedMessage id="ui-orders.settings.poNumber.addOption" />
          <strong>
            {filterValue}
          </strong>
        </div>
      );
    }
  }

  getOptionsList = (option) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues(PREFIXES_FORM_NAME)(store.getState());
    const optionsList = get(formValues, option, []);

    return optionsList;
  }

  render() {
    const actionsPrefix = [{ onSelect: this.addPrefix, render: this.renderOption }];

    return (
      <Row>
        <Col data-test-prefixes-list>
          <Field
            actions={actionsPrefix}
            component={MultiSelection}
            dataOptions={this.getOptionsList('selectedItems')}
            emptyMessage=" "
            fullWidth
            name="selectedItems"
            onBlur={e => { e.preventDefault(); }}
          />
        </Col>
      </Row>
    );
  }
}

export default PrefixesForm;

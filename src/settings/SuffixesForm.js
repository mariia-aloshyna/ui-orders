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

const SUFFIXES_FORM_NAME = 'configForm';

class SuffixesForm extends Component {
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

    dispatch(change(SUFFIXES_FORM_NAME, fieldName, newList));
  }

  addSuffix = ({ inputValue }) => this.addValue(inputValue, 'selectedItems');

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
    const formValues = getFormValues(SUFFIXES_FORM_NAME)(store.getState());
    const optionsList = get(formValues, option, []);

    return optionsList;
  }

  render() {
    const actionsSuffix = [{ onSelect: this.addSuffix, render: this.renderOption }];

    return (
      <Row>
        <Col data-test-suffixes-list>
          <Field
            actions={actionsSuffix}
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

export default SuffixesForm;

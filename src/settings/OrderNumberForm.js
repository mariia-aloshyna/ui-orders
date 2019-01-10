import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  getFormValues,
} from 'redux-form';

import { get } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Checkbox,
  Col,
  Headline,
  MultiSelection,
  Row,
} from '@folio/stripes/components';

class OrderNumberForm extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      store: PropTypes.object.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  };

  addValue = (inputValue, fieldName) => {
    const { dispatch, change } = this.props;
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
    const list = this.getOptionsList(fieldName);
    const newList = [...list, newOption];

    dispatch(change(fieldName, newList));
  }

  addPrefix = ({ inputValue }) => this.addValue(inputValue, 'prefixes');

  addSuffix = ({ inputValue }) => this.addValue(inputValue, 'suffixes');

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
    const formValues = getFormValues('configForm')(store.getState());
    const optionsList = get(formValues, option, []);

    return optionsList;
  }

  render() {
    const actionsPrefix = [{ onSelect: this.addPrefix, render: this.renderOption }];
    const actionsSuffix = [{ onSelect: this.addSuffix, render: this.renderOption }];

    return (
      <AccordionSet>
        <Accordion
          label={<FormattedMessage id="ui-orders.settings.poNumber" />}
          separator={false}
        >
          <Row>
            <Col xs={12}>
              <Headline margin="none">
                <FormattedMessage id="ui-orders.settings.poNumber" />
              </Headline>
              <Field
                component={Checkbox}
                label={<FormattedMessage id="ui-orders.settings.poNumber.editPONumber" />}
                name="canUserEditOrderNumber"
                type="checkbox"
              />
            </Col>
          </Row>
        </Accordion>
        <Accordion label={<FormattedMessage id="ui-orders.settings.poNumber.prefixSuffix" />}>
          <Row>
            <Col xs={12}>
              <Headline>
                <FormattedMessage id="ui-orders.settings.poNumber.prefix" />
              </Headline>
              <Field
                actions={actionsPrefix}
                component={MultiSelection}
                dataOptions={this.getOptionsList('prefixes')}
                emptyMessage=" "
                fullWidth
                name="selectedPrefixes"
              />
              <Headline>
                <FormattedMessage id="ui-orders.settings.poNumber.suffix" />
              </Headline>
              <Field
                actions={actionsSuffix}
                component={MultiSelection}
                dataOptions={this.getOptionsList('suffixes')}
                emptyMessage=" "
                fullWidth
                name="selectedSuffixes"
              />
            </Col>
          </Row>
        </Accordion>
      </AccordionSet>
    );
  }
}

export default OrderNumberForm;

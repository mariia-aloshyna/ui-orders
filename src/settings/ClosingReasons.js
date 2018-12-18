import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Callout } from '@folio/stripes/components';

import ClosingReasonsForm from './ClosingReasonsForm';

class ClosingReasons extends Component {
  static manifest = Object.freeze({
    closingReasons: {
      type: 'okapi',
      records: 'configs',
      path: 'configurations/entries',
      GET: {
        params: {
          query: '(module=ORDERS and configName=closing-reasons)',
        },
      },
    },
  });

  static propTypes = {
    label: PropTypes.node.isRequired,
    mutator: PropTypes.shape({
      closingReasons: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
    resources: PropTypes.shape({
      closingReasons: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.styles = {
      closingReasonsWrapper: {
        width: '100%',
      },
    };
  }

  removeReason = async (reason) => {
    const { mutator: { closingReasons } } = this.props;
    const id = get(reason, 'id');

    if (id) {
      try {
        await closingReasons.DELETE({ id });
        this.callout.sendCallout({ message: <FormattedMessage id="ui-orders.settings.closingReasons.remove.success" /> });
      } catch (e) {
        this.callout.sendCallout({
          message: <FormattedMessage id="ui-orders.settings.closingReasons.remove.error" />,
          type: 'error',
        });
      }
    }
  }

  saveReason = async (reason) => {
    const { mutator: { closingReasons } } = this.props;
    const mutatorMethod = reason.id ? closingReasons.PUT : closingReasons.POST;

    if (!reason.value) {
      this.removeReason(reason);
    } else {
      try {
        await mutatorMethod(reason);
        this.callout.sendCallout({ message: <FormattedMessage id="ui-orders.settings.closingReasons.save.success" /> });
      } catch (e) {
        this.callout.sendCallout({
          message: <FormattedMessage id="ui-orders.settings.closingReasons.save.error" />,
          type: 'error',
        });
      }
    }
  }

  createCalloutRef = ref => {
    this.callout = ref;
  };

  render() {
    const { label, resources } = this.props;

    return (
      <div style={this.styles.closingReasonsWrapper}>
        <ClosingReasonsForm
          initialValues={get(resources, 'closingReasons', [])}
          removeReason={this.removeReason}
          saveReason={this.saveReason}
          title={label}
        />
        <Callout ref={this.createCalloutRef} />
      </div>
    );
  }
}

export default ClosingReasons;

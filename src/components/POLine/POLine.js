import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { ORDER } from '../Utils/resources';
import {
  lineMutatorShape,
  orderRecordsMutatorShape,
} from '../Utils/mutators';

import POLineView from './POLineView';

class POLine extends Component {
  static manifest = Object.freeze({
    order: ORDER,
  });

  static propTypes = {
    showToast: PropTypes.func.isRequired,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.shape({
      query: PropTypes.object.isRequired,
      poLine: lineMutatorShape,
      records: orderRecordsMutatorShape,
    }).isRequired,
    poURL: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        lineId: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
  }

  getOrder = () => get(this.props.resources, ['order', 'records', 0]);

  getLine = () => {
    const { match: { params: { lineId } } } = this.props;
    const order = this.getOrder();
    const lines = get(order, 'compositePoLines', []);

    return lines.find(u => u.id === lineId);
  }

  deleteLine = () => {
    const { parentMutator, poURL, showToast } = this.props;
    const line = this.getLine();
    const lineNumber = line.poLineNumber;

    parentMutator.poLine.DELETE(line).then(() => {
      showToast('ui-orders.line.delete.success', 'success', { lineNumber });
      parentMutator.query.update({ _path: poURL });
    });
  };

  render() {
    const {
      match,
      parentMutator,
      parentResources,
    } = this.props;

    const order = this.getOrder();
    const line = this.getLine();
    const materialTypes = get(parentResources, ['materialTypes', 'records'], []);
    const locations = get(parentResources, 'locations.records', []);
    const vendors = get(parentResources, 'vendors.records', []);
    const funds = get(parentResources, 'fund.records', []);
    const identifierTypes = get(parentResources, 'identifierTypes.records', []);
    const contributorNameTypes = get(parentResources, 'contributorNameTypes.records', []);
    const poURL = this.props.poURL;
    const receivingURL = `${match.url}/receiving`;
    const checkinURL = `${match.url}/check-in`;

    return (
      <POLineView
        location={this.props.location}
        history={this.props.history}
        line={line}
        order={order}
        materialTypes={materialTypes}
        locations={locations}
        vendors={vendors}
        poURL={poURL}
        receivingURL={receivingURL}
        checkinURL={checkinURL}
        funds={funds}
        queryMutator={parentMutator.query}
        deleteLine={this.deleteLine}
        identifierTypes={identifierTypes}
        contributorNameTypes={contributorNameTypes}
      />
    );
  }
}

export default POLine;

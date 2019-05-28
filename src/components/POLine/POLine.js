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
    parentResources: PropTypes.object,
    parentMutator: PropTypes.shape({
      poLine: lineMutatorShape,
      records: orderRecordsMutatorShape,
    }),
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

  render() {
    const {
      match,
      match: { params: { lineId } },
      parentResources,
      resources,
    } = this.props;

    const order = get(resources, ['order', 'records', 0]);
    const lines = get(order, 'compositePoLines', []);
    const line = lines.find(u => u.id === lineId);
    const materialTypes = get(parentResources, ['materialTypes', 'records'], []);
    const locations = get(this.props.parentResources, 'locations.records', []);
    const vendors = get(this.props.parentResources, 'vendors.records', []);
    const funds = get(this.props.parentResources, 'fund.records', []);
    const poURL = this.props.poURL;
    const receivingURL = `${match.url}/receiving`;
    const checkinURL = `${match.url}/check-in/items`;

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
      />
    );
  }
}

export default POLine;

import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Layer } from '@folio/stripes/components';
import { DATE_FORMAT } from '../Utils/const';
import transitionToParams from '../Utils/transitionToParams';
import { POLineForm } from '../POLine';

class LayerPOLine extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    order: PropTypes.object,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  submitPOLine(data) {
    this.props.parentMutator.poLine.POST(data).then(() => {
      this.props.onCancel();
    });
  }

  updatePOLine(data) {
    const { parentMutator, location: { pathname } } = this.props;
    parentMutator.poLine.PUT(data).then(() => {
      parentMutator.query.update({
        _path: `${pathname}`,
        layer: null
      });
    });
  }

  getCreatePOLIneInitialValues() {
    const { order } = this.props;
    const newObj = {
      cost: {},
      created: moment.utc().format(DATE_FORMAT),
      source: {},
      vendor_detail: {},
    };
    if (order && order.id) {
      newObj.purchase_order_id = order.id;
    }
    return newObj;
  }

  render() {
    const { location } = this.props;
    const query = location.search ? queryString.parse(location.search) : {};
    return (
      <div>
        <Layer isOpen={query.layer ? query.layer === 'create-po-line' : false} label="Create PO Line Dialog">
          <this.connectedPOLineForm initialValues={this.getCreatePOLIneInitialValues()} onSubmit={(record) => { this.submitPOLine(record); }} {...this.props} />
        </Layer>
        <Layer isOpen={query.layer ? query.layer === 'edit-po-line' : false} label="Edit PO Line Dialog">
          <this.connectedPOLineForm initialValues={this.props.order} onSubmit={(record) => { this.updatePOLine(record); }} {...this.props} />
        </Layer>
      </div>
    );
  }
}

export default LayerPOLine;

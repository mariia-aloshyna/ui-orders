import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Layer } from '@folio/stripes-components';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import { POLineForm } from '../POLine';

class LayerPOLine extends Component {
  static propTypes = {
    getInitialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  postPOLine(data) {
    console.log(data);
    this.props.parentMutator.poLine.POST(data).then(() => {
      this.props.onCancel();
    });
  }

  updatePOLine(data) {
    console.log(data);
  }

  getCreatePOLIneInitialValues() {
    const { getInitialValues } = this.props;
    let newObj = {};
    if (getInitialValues && getInitialValues.id) {
      newObj = Object.assign({
        purchase_order_id: getInitialValues.id,
        // vendor_name: poInitialValues.vendor_name,
      });
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
          <this.connectedPOLineForm initialValues={this.props.getInitialValues} onSubmit={(record) => { this.updatePOLine(record); }} {...this.props} />
        </Layer>
      </div>
    );
  }
}

export default LayerPOLine;

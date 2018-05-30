import React from 'react';
import { Route, Link } from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import LineView from '../Line/LineView';

class POLineListing extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
    this.connectedLineView = this.props.stripes.connect(LineView);
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  onSelectRow = (e, meta) => {
    const { match, history } = this.props;
    const url = match.url;
    history.push(`${url}/po-line/view/${meta.id}`);
  }

  render() {
    const catalogResults = [
      { title: 'Biology Today',
        id: '199930490002',
        author: {
          firstName: 'James',
          lastName: 'Whitcomb',
        }
      },
      { title: 'Financial Matters',
        id: '199930490034',
        author: {
          firstName: 'Philip',
          lastName: 'Marston',
        },
      },
      { title: 'Modern Microbiotics',
        id: '199930490064',
        author: {
          firstName: 'Eric',
          lastName: 'Martin',
        },
      }
    ];
    const resultsFormatter = {
      author: item => `${item.author.firstName} ${item.author.lastName}`,
    };
    return (
      <div>
        <MultiColumnList
          contentData={catalogResults}
          formatter={resultsFormatter}
          onRowClick={this.onSelectRow}
          visibleColumns={['title', 'id']}
        />
      </div>
    );
  }
}

export default POLineListing;

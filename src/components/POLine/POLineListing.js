import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import POLineView from '../POLine/POLineView';

class POLineListing extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.connectedPOLineView = this.props.stripes.connect(POLineView);
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
          visibleColumns={['title', 'id']}
        />
      </div>
    );
  }
}

export default POLineListing;

import { Component } from 'react';
import _ from 'lodash';

class HandleErrors extends Component {
  static getDerivedStateFromProps(props, state) {
    const { names, sectionErrors } = props;
    // function newDate() {
    const newSectionErrors = Object.assign({}, sectionErrors);
    if (names && names.length > 0) {
      Object.keys(names).map(key => {
        const indexName = names[key];
        const input = props[`${indexName}`].input;
        const meta = props[`${indexName}`].meta;
        const isError = ((meta.error) && meta.error.length > 0) ? true : false;

        for (const propName in newSectionErrors) {
          if (newSectionErrors) {
            const parentName = newSectionErrors[propName];
            for (const propNameII in parentName) {
              if (propNameII === indexName) {
                newSectionErrors[propName][propNameII] = isError;
              }
            }
          }
        }
        return true;
      });

      if (newSectionErrors !== state.sectionErrors) {
        props.updateSectionErrors(newSectionErrors);
        return { sectionErrors: newSectionErrors };
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return false;
  }
}

export default HandleErrors;

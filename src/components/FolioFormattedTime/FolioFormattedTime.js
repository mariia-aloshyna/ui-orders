import React from 'react';
import { FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

const FolioFormattedTime = ({ dateString }) => {
  return dateString
    ? (
      <FormattedTime
        day="numeric"
        month="numeric"
        timeZoneName="short"
        value={dateString}
        year="numeric"
      />
    )
    : null;
};

FolioFormattedTime.propTypes = {
  dateString: PropTypes.string,
};

export default FolioFormattedTime;

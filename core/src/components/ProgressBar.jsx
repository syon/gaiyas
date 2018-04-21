/* @type */
import PropTypes from 'prop-types';

import React from 'react';

const ProgressBar = (props) => {
  const styles = {
    width: `${props.rate * 100}%`,
  }
  return (
    <div className="ceg__progressbar">
      <div className="ceg__progressbar-inner" style={styles} />
    </div>
  )
}

ProgressBar.propTypes = {
  rate: PropTypes.number.isRequired,
}

export default ProgressBar

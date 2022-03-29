import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

JumpalPossiblyEmpty.propTypes = {
  msg: PropTypes.string,
  isPopulated: PropTypes.bool,
  children: PropTypes.element,
};

function JumpalPossiblyEmpty(props) {
  const { msg, isPopulated, children } = props;
  const [showChildren, setShowChildren] = useState(isPopulated);

  useEffect(() => {
    setShowChildren(isPopulated);
  }, [isPopulated]);

  if (showChildren) {
    return children;
  } else {
    return (
      <p style={{ textAlign: 'center' }}>
        {msg}
      </p>
    );
  }
};

export default JumpalPossiblyEmpty;

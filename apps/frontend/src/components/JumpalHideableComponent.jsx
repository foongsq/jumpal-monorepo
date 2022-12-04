import React from "react";
import PropTypes from "prop-types";

JumpalHideableComponent.propTypes = {
  hide: PropTypes.bool,
  children: PropTypes.element,
};

export default function JumpalHideableComponent(props) {
  const { hide, children } = props;
  return <div style={{ display: hide ? "none" : "block" }}>{children}</div>;
}

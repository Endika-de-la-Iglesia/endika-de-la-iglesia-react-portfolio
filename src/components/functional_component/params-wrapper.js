import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ParamsWrapper = ({ component: WrappedComponent, ...rest }) => {

  const params = useParams();
  const location = useLocation();
  const state = location.state || {}

  return <WrappedComponent {...params} {...state} {...rest} />;
};

export default ParamsWrapper;

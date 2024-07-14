import React from "react";
import { useParams } from "react-router-dom";

const ParamsWrapper = ({ component: WrappedComponent, ...rest }) => {
  const params = useParams();

  return <WrappedComponent {...params} {...rest} />;
};

export default ParamsWrapper;

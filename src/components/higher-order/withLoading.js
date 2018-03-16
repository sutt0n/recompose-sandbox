import React from "react";

const withLoading = BaseComponent => props => (
  <div>
    <BaseComponent {...props} />

    <div>{props.isLoading && <span>Loading...</span>}</div>
  </div>
);

export default withLoading;

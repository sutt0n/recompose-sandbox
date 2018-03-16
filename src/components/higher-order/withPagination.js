import React from "react";

const withPagination = BaseComponent => props => {
  let pageBtns = [];

  for (var i = 0; i < props.totalPages; i++) {
    const isDisabled = i === props.page;
    pageBtns.push(
      <button
        type="submit"
        key={i}
        data-page={i}
        onClick={props.onChangePage}
        disabled={isDisabled}
      >
        {i}
      </button>
    );
  }

  console.log(pageBtns);

  return (
    <div>
      <BaseComponent {...props} />

      {props.page !== null && !props.isLoading && pageBtns.map(btn => btn)}
    </div>
  );
};

export default withPagination;

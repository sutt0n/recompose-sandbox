import React from "react";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    const defaultColumn = {
      name: null,
      label: null
    };

    this.state = {
      columns: [defaultColumn] || props.columns,
      sorters: [],
      data: []
    };

    this.onSortClick = this.onSortClick.bind(this);
  }

  onSortClick(e) {
    console.log(e);
    // add to sorters thingy weee
  }

  render() {
    <table className="table">
      <tr className="thead-dark">
        {this.state.columns.length > 1 &&
          this.state.columns.map(column => (
            <th scope="col" key={column.name}>
              <span
                data-name={column.name}
                onClick={this.onSortClick(column.name)}
              >
                {column.label}
              </span>
            </th>
          ))}
      </tr>
      {this.state.data &&
        this.state.data.map(record => {
          <tr>{Object.keys(record).map((key, value) => <td>{value}</td>)}</tr>;
        })}
    </table>;
  }
}

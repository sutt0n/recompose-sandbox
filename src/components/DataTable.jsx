import React from "react";

const DataTableCell = ({ value }) => <td>{value}</td>;

const DataTableRow = ({ idName, columns, record }) => (
  <tr>
    {columns.map(column => (
      <DataTableCell
        key={"cell-" + column.name + "-" + record[idName]}
        value={record[column.name]}
      />
    ))}
  </tr>
);

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.sorters = [];
  }

  onSortByColumn(e) {
    console.log(e.target.dataset.key);
  }

  render() {
    const { idName, columns, isLoading, data } = this.props;

    return (
      <table className="table table-dark">
        <thead className="thead-dark">
          <tr>
            {columns.map(column => (
              <th scope="col" key={column.name}>
                <span data-key={column.name} onClick={this.onSortByColumn}>
                  {column.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <DataTableRow
              key={"row-" + record[idName]}
              idName={idName}
              columns={columns}
              record={record}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

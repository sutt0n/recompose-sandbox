import React from "react";
import { compose } from "recompose";

import DataTable from "./components/DataTable.jsx";
import withLoading from "./components/higher-order/withLoading";
import withPagination from "./components/higher-order/withPagination";

import "./App.css";

const applyUpdateResult = result => prevState => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  totalPages: result.nbPages,
  isLoading: false
});

const applySetResult = result => prevState => ({
  hits: result.hits,
  page: result.page,
  totalPages: result.nbPages,
  isLoading: false
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=10`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
      isLoading: false,
      totalPages: 0
    };
  }

  onInitialSearch = e => {
    e.preventDefault();

    const { value } = this.input;

    if (value === "") {
      return;
    }

    this.fetchStories(value, 0);
  };

  onPaginatedSearch = e =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) => {
    this.setState({ hits: [], isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));
  };

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  onChangePage = e => {
    const page = e.target.dataset.page;

    this.setState({ page });

    this.fetchStories(this.input.value, page);
  };

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => (this.input = node)} />
            <button type="submit">Search</button>
          </form>
        </div>

        <DataTableNew
          columns={[
            { name: "author", label: "Author" },
            { name: "title", label: "Title" }
          ]}
          data={this.state.hits}
          page={this.state.page}
          isLoading={this.state.isLoading}
          onChangePage={this.onChangePage}
          totalPages={this.state.totalPages}
          idName="objectID"
        />
      </div>
    );
  }
}

const DataTableNew = compose(withLoading, withPagination)(DataTable);

// const List = ({ list }) => (
//   <div className="list">
//     {list.map(item => <
//       <div className="list-row" key={item.objectID}>
//         <a href={item.url}>{item.title}</a>
//       </div>
//     ))}
//   </div>
// );

// const ListWithLoading = compose(withLoading, withPagination)(List);

export default App;

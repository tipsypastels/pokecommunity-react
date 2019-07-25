import React, { Component } from 'react';

import '../../styles/modules/Pagination.scss';

interface IProps {
  currentPage: number;
  totalPages: number;
}

// TODO this could go in settings json
const PAGE_RANGE = 3;

class Pagination extends Component<IProps> {
  render() {
    if (this.props.currentPage <= 1 && this.props.totalPages <= 1) {
      return null;
    }

    return (
      <div className="Pagination">
        {this.buildBackwards()}

        <div key={this.props.currentPage} className="pagination-item">
          {this.props.currentPage}
        </div>

        {this.buildForwards()}
      </div>
    )
  }

  buildBackwards() {
    let renderedPages = [];
    let page = this.props.currentPage - 1;

    while(true) {
      if (page < this.props.currentPage - PAGE_RANGE || page <= 0) {
        break;
      }

      renderedPages.push(
        <div key={page} className="pagination-item">
          {page}
        </div>
      );

      page--;
    }

    return (
      <React.Fragment>
        {renderedPages.reverse()}
      </React.Fragment>
    );
  }

  buildForwards() {
    let renderedPages = [];
    let page = this.props.currentPage + 1;

    while (true) {
      console.log(page);
      console.log(page <= this.props.currentPage + PAGE_RANGE);
      console.log(page > this.props.totalPages)
      if (page > this.props.currentPage + PAGE_RANGE || page > this.props.totalPages) {
        break;
      }

      renderedPages.push(
        <div key={page} className="pagination-item">
          {page}
        </div>
      );

      page++;
    }

    return (
      <React.Fragment>
        {renderedPages}
      </React.Fragment>
    );
  }
}

export default Pagination;
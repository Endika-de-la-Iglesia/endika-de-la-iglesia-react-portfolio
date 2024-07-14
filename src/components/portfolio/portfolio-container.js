import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";
import axios from "axios";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      data: [],
      visibleData: [],
      isLoading: false,
    };

    // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.getPortfolioItems = this.getPortfolioItems.bind(this);
  }

  getPortfolioItems() {
    axios
      .get("https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        // handle success
        this.setState({
          data: response.data.portfolio_items,
          visibleData: response.data.portfolio_items,
        });
      })

      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.visibleData.map((item) => {
      return <PortfolioItem item={item} key={item.id} />;
    });
  }

  handleFilter(filter) {
    if (filter === "all") {
      this.setState({
        visibleData: this.state.data,
      });
    } else {
      this.setState({
        visibleData: this.state.data.filter((item) => {
          return item.category === filter;
        }),
      });
    }
  }

  //   handlePageTitleUpdate() {
  //     if (this.state.pageTitle !== "New page title") {
  //       this.setState({
  //         pageTitle: "New page title",
  //       });
  //     } else {
  //       this.setState({
  //         pageTitle: "Welcome to my portfolio",
  //       });
  //     }
  //   }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <div className="portfolio-items-container">
          <div className="filter-btns">
            <button
              className="btn"
              onClick={() => this.handleFilter("Category 1")}
            >
              Category 1
            </button>

            <button
              className="btn"
              onClick={() => this.handleFilter("Category 2")}
            >
              Category 2
            </button>

            <button
              className="btn"
              onClick={() => this.handleFilter("Category 3")}
            >
              Category 3
            </button>

            <button className="btn" onClick={() => this.handleFilter("all")}>
              Show all
            </button>
          </div>

          <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
        </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {},
    };

    this.getPortfolioItems = this.getPortfolioItems.bind(this);
    this.handleSuccessfulNewFormSubmission =
      this.handleSuccessfulNewFormSubmission.bind(this);
    this.handleSuccessfulEditFormSubmission =
      this.handleSuccessfulEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {},
    });
  }

  handleSuccessfulNewFormSubmission(portfolioItem) {
    this.setState((prevState) => ({
      portfolioItems: [portfolioItem, ...prevState.portfolioItems],
    }));
  }

  handleSuccessfulEditFormSubmission(portfolioItem) {
    this.setState((prevState) => ({
      portfolioItems: prevState.portfolioItems.map((item) =>
        item.id === portfolioItem.id ? portfolioItem : item
      ),
    }));
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError", error);
  }

  handleDeleteClick(portfolioItem) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter((item) => {
            return item.id !== portfolioItem.id;
          }),
        });
        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  handleEditClick(portfolioItem) {
    this.setState({
      portfolioToEdit: portfolioItem,
    });
  }

  getPortfolioItems() {
    axios
      .get(
        "https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          portfolioItems: [...response.data.portfolio_items],
        });
      })
      .catch((error) => {
        console.log("Error with getPortfolioItems: ", error);
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  componentDidUpdate(prevState) {
    if (prevState && prevState.portfolioItems && this.state.portfolioItems) {
      if (
        prevState.portfolioItems.length !== this.state.portfolioItems.length
      ) {
        console.log("Portfolio items updated");
      }
    }
  }

  render() {
    return (
      <div>
        <div className="portfolio-manager-wrapper">
          <div className="left-side">
            <PortfolioForm
              handleSuccessfulNewFormSubmission={
                this.handleSuccessfulNewFormSubmission
              }
              handleSuccessfulEditFormSubmission={
                this.handleSuccessfulEditFormSubmission
              }
              handleFormSubmissionError={this.handleFormSubmissionError}
              clearPortfolioToEdit={this.clearPortfolioToEdit}
              portfolioToEdit={this.state.portfolioToEdit}
            />
          </div>

          <div className="right-side">
            <PortfolioSidebarList
              list={this.state.portfolioItems}
              handleDeleteClick={this.handleDeleteClick}
              handleEditClick={this.handleEditClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

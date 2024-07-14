import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

export default class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false,
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this._isMounted = false;
    this.activateInfiniteScroll();
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewFormSubmission =
      this.handleSuccessfulNewFormSubmission.bind(this);
    this.handleSuccessfulBlogItemDeletion =
      this.handleSuccessfulBlogItemDeletion.bind(this);
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false,
    });
  }

  handleSuccessfulNewFormSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems),
    });
  }

  handleSuccessfulBlogItemDeletion(blogItemId) {
    const { blogItems } = this.state;
    const updatedBlogItems = blogItems.filter((item) => item.id !== blogItemId);
    
    this.setState({
      blogItems: updatedBlogItems,
    });
  }

  activateInfiniteScroll() {
    window.onscroll = () => {
      if (
        this._isMounted &&
        !this.state.isLoading &&
        window.innerHeight + document.documentElement.scrollTop >
          document.documentElement.offsetHeight - 1 &&
        this.state.totalCount > this.state.blogItems.length
      ) {
        this.getBlogItems();
      }
    };
  }

  getBlogItems() {
    this.setState({
      isLoading: true,
      currentPage: this.state.currentPage + 1,
    });

    axios
      .get(
        `https://endikadelaiglesia.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          blogItems: this.state.blogItems.concat(
            ...response.data.portfolio_blogs
          ),
          totalCount: response.data.meta.total_records,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error: ", error);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.getBlogItems();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <div className="blog-entries-wrapper">
          {this.props.loggedInStatus === "LOGGED_IN" ? (
            <div>
              <BlogModal
                handleModalClose={this.handleModalClose}
                isOpen={this.state.blogModalIsOpen}
                handleSuccessfulNewFormSubmission={
                  this.handleSuccessfulNewFormSubmission
                }
              />
              <div className="new-blog-link">
                <a onClick={this.handleNewBlogClick}>
                  <FontAwesomeIcon icon="fa-circle-plus" size="2x" />
                </a>
              </div>
            </div>
          ) : null}

          <BlogItem
            blogItems={this.state.blogItems}
            loggedInStatus={this.props.loggedInStatus}
            handleSuccessfulBlogItemDeletion={this.handleSuccessfulBlogItemDeletion}
          />
        </div>

        {this.state.isLoading ? (
          <div className="loading-icon">
            <FontAwesomeIcon icon="fa-spinner" spin size="5x" />
          </div>
        ) : null}
      </div>
    );
  }
}

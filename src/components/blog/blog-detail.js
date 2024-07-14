import React, { Component } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogFeaturedImage from "./blog-featured-image";
import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blog: {},
      currentId: this.props.slug,
      content: "",
      featured_image_url: "",
      blog_status: "",
      title: "",
      editMode: false,
    };

    this.getBlogItem = this.getBlogItem.bind(this);
    this.transform = this.transform.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.contentManager = this.contentManager.bind(this);
    this.handleSuccessfulEditSubmission =
      this.handleSuccessfulEditSubmission.bind(this);
  }

  handleEditClick() {
    this.setState({
      editMode: true,
    });
  }

  handleSuccessfulEditSubmission(editMode, blogItem) {
    const { content, featured_image_url, blog_status, title } = blogItem

    this.setState({
      blog: blogItem,
      content: content,
      featured_image_url: featured_image_url,
      blog_status: blog_status,
      title: title,
      editMode: editMode,
    });
  }

  getBlogItem() {
    axios
      .get(
        `https://endikadelaiglesia.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`,
        { withCredentials: true }
      )
      .then((response) => {
        const { blog_status, content, title, featured_image_url } =
          response.data.portfolio_blog;

        const blog = response.data.portfolio_blog;

        this.setState({
          blog: blog,
          content: content,
          featured_image_url: featured_image_url,
          blog_status: blog_status,
          title: title,
        });
      })
      .catch((error) => {
        console.log("getBlogItem error: ", error);
      });
  }

  transform(node) {
    if (node.attribs && node.attribs.style) {
      // Split styles and filter out font-family while retaining others
      const styles = node.attribs.style
        .split(";")
        .reduce((styleObj, styleRule) => {
          let [property, value] = styleRule.split(":");
          if (property && value) {
            property = property.trim();
            value = value.trim();
            if (property !== "font-family") {
              styleObj[property] = value;
            }
          }
          return styleObj;
        }, {});

      // Rebuild the style string
      node.attribs.style = Object.entries(styles)
        .map(([property, value]) => `${property}: ${value}`)
        .join("; ");

      // Remove the style attribute if it's empty
      if (!node.attribs.style) {
        delete node.attribs.style;
      }
    }

    // Recursively apply transformation to child nodes
    if (node.children) {
      node.children = node.children.map((child) => this.transform(child));
    }

    return node;
  }

  componentDidMount() {
    this.getBlogItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedInStatus !== this.props.loggedInStatus) {
      this.setState({ loggedInStatus: this.props.loggedInStatus });
    }
  }

  contentManager() {
    if (this.state.editMode) {
      return (
        <BlogForm
          editMode={this.state.editMode}
          blog={this.state.blog}
          handleSuccessfulEditSubmission={this.handleSuccessfulEditSubmission}
          callingComponent={"BlogDetail"}
        />
      );
    } else {
      return (
        <div className="blog-container">
          <div className="blog-item-wrapper">
            <h1>{this.state.title}</h1>

            {this.props.loggedInStatus === "LOGGED_IN" ? (
              <div className="action-icons">
                <a
                  className="action-icon edit-icon"
                  onClick={() => this.handleEditClick()}
                >
                  <FontAwesomeIcon icon="fa-file-pen" size="2x" />
                </a>
              </div>
            ) : null}

            <BlogFeaturedImage img={this.state.featured_image_url} />

            <div className="content">
              {parse(this.state.content, { replace: this.transform })}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.contentManager();
  }
}

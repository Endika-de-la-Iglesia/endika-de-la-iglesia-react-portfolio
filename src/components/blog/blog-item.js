import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import sanitizeHtml from "sanitize-html";
import Truncate from "react-truncate";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogItem = (props) => {
  const handleDeleteClick = (blogItem) => {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_blogs/${blogItem.id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.msg === "RECORD_DELETED") {
          props.handleSuccessfulBlogItemDeletion(blogItem.id);
        }
      })
      .catch((error) => {
        console.log("delete blog error", error);
      });
  };

  return props.blogItems.map((blogItem) => {
    const { id, blog_status, content, title, featured_image_url } = blogItem;
    return (
      <div key={id} className="blog-item">
        <div className="blog-title">
          <Link to={`/b/${id}`}>
            <h1>{title}</h1>
          </Link>

          {props.loggedInStatus === "LOGGED_IN" && (
            <div className="action-icons">
              <a
                className="action-icon delete-icon"
                onClick={() => handleDeleteClick(blogItem)}
              >
                <FontAwesomeIcon icon="fa-trash" size="xl" />
              </a>
            </div>
          )}
        </div>

        {content && (
          <div className="content">
            <Truncate
              lines={5}
              ellipsis={
                <span>
                  <Link to={`/b/${id}`}>Read more</Link>
                </span>
              }
            >
              {striptags(sanitizeHtml(content))}
            </Truncate>
          </div>
        )}
      </div>
    );
  });
};

export default BlogItem;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PortfolioSidebarList(props) {
  const portfolioList = props.list.map((portfolioItem) => {
    return (
      <div key={portfolioItem.id}>
        <div className="portfolio-item-thumb">
          <div className="portfolio-thumb-img">
            <img src={portfolioItem.thumb_image_url} />
          </div>

          <div className="portfolio-item-info">
            <h1 className="title">{portfolioItem.name}</h1>
            <div className="action-icons">
              <a
                className="action-icon edit-icon"
                onClick={() => props.handleEditClick(portfolioItem)}
              >
                <FontAwesomeIcon icon="fa-file-pen" size="xl" />
              </a>

              <a
                className="action-icon delete-icon"
                onClick={() => props.handleDeleteClick(portfolioItem)}
              >
                <FontAwesomeIcon icon="fa-trash" size="xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>
    </div>
  );
}

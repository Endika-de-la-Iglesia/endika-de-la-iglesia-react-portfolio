import React, { Component } from "react";
import axios from "axios";

// const { state } = useLocation();

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      description: "",
      thumb_image_url: "",
      logo_url: "",
      name: "",
    };
  }

  componentDidMount() {
    if (this.props.item) {
      const { id, description, thumb_image_url, logo_url, name, url } =
        this.props.item;

      this.setState({
        id: id || "",
        description: description || "",
        thumb_image_url: thumb_image_url || "",
        logo_url: logo_url || "",
        name: name || "",
        url: url || "",
      });
    } else if (this.props.slug) {
      const id = this.props.slug;

      this.getPortfolioItem(id);
    }
  }

  getPortfolioItem(id) {
    axios
      .get(
        `https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items/${id}`
      )
      .then((response) => {
        const { id, description, thumb_image_url, logo_url, name, url } =
          response.data.portfolio_item;
        this.setState({
          id: id || "",
          description: description || "",
          thumb_image_url: thumb_image_url || "",
          logo_url: logo_url || "",
          name: name || "",
          url: url || "",
        });
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  }

  render() {
    const { name, description, thumb_image_url, logo_url, url } = this.state;

    const bannerInlineStyles = {
      backgroundImage: "url(" + this.state.thumb_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };

    const logoStyles = {
      width: "200px",
    };

    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner" style={bannerInlineStyles}>
          <img src={logo_url} alt={name} style={logoStyles}/>
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="title">
            <h2>{name}</h2>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>

        <div className="portfolio-bottom-wrapper">
          <div className="site-link">
            <a href={url}>Visit {name} site</a>
          </div>
        </div>
      </div>
    );
  }
}

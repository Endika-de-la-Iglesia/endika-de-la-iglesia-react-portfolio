import React, { Component } from "react";
import axios from "axios";
import MyDropzone from "../functional_component/dropzone-component";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      description: "",
      category: "",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
      previous_thumb_image: "",
      previous_banner_image: "",
      previous_logo: "",
      resetTrigger: false,
      apiUrl:
        "https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.deleteImageFromServer = this.deleteImageFromServer.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        banner_image_url,
        logo_url,
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "Category 1",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        previous_thumb_image: thumb_image_url || "",
        previous_banner_image: banner_image_url || "",
        previous_logo: logo_url || "",
        resetTrigger: false,
      });
    }
  }

  handleThumbDrop(acceptedFiles, previousFile) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setState({
        thumb_image: acceptedFiles[0],
      });
    } else if (previousFile) {
      this.setState({
        thumb_image: previousFile,
      });
    } else if (acceptedFiles === null && previousFile === null) {
      this.setState({
        thumb_image: "",
      });
    }
  }

  handleLogoDrop(acceptedFiles, previousFile) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setState({
        logo: acceptedFiles[0],
      });
    } else if (previousFile) {
      this.setState({
        logo: previousFile,
      });
    } else if (acceptedFiles === null && previousFile === null) {
      this.setState({
        logo: "",
      });
    }
  }

  handleBannerDrop(acceptedFiles, previousFile) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setState({
        banner_image: acceptedFiles[0],
      });
    } else if (previousFile) {
      this.setState({
        banner_image: previousFile,
      });
    } else if (acceptedFiles === null && previousFile === null) {
      this.setState({
        banner_image: "",
      });
    }
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }

    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }

    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }

    return formData;
  }

  resetFormState() {
    this.setState(
      {
        id: "",
        name: "",
        description: "",
        category: "Category 1",
        position: "",
        url: "",
        thumb_image: "",
        banner_image: "",
        logo: "",
        previous_thumb_image: "",
        previous_banner_image: "",
        previous_logo: "",
        resetTrigger: true,
        apiUrl:
          "https://endikadelaiglesia.devcamp.space/portfolio/portfolio_items",
        apiAction: "post",
      },
      () => {
        setTimeout(() => {
          this.setState({ resetTrigger: false });
        }, 0);
      }
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { apiAction, apiUrl } = this.state;

    const performSubmit = () => {
      axios({
        method: apiAction,
        url: apiUrl,
        data: this.buildForm(),
        withCredentials: true,
      })
        .then((response) => {
          if (this.state.apiAction === "post") {
            this.props.handleSuccessfulNewFormSubmission(
              response.data.portfolio_item
            );
          } else if (this.state.apiAction === "patch") {
            this.props.handleSuccessfulEditFormSubmission(
              response.data.portfolio_item
            );
          }

          this.resetFormState();
        })
        .catch((error) => {
          this.props.handleFormSubmissionError(error);
        });
    };

    if (apiAction === "patch") {
      axios({
        method: "get",
        url: apiUrl,
        withCredentials: true,
      })
        .then((response) => {
          performSubmit();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.props.handleFormSubmissionError({
              message: "The item you are trying to update does not exist.",
            });
            this.resetFormState();
          } else {
            this.props.handleFormSubmissionError(error);
          }
        });
    } else {
      performSubmit();
    }
  }

  deleteImageFromServer(id, imgTypeUrl) {
    const encodedId = encodeURIComponent(id);
    const encodedImgTypeUrl = encodeURIComponent(imgTypeUrl);

    let url = `https://api.devcamp.space/portfolio/delete-portfolio-image/${encodedId}?image_type=${encodedImgTypeUrl}`;

    axios
      .delete(url, { withCredentials: true })
      .then((response) => {})
      .catch((error) => {
        console.error("deleteImageFromServer error", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />

          <select
            className="select-element"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </select>
        </div>

        <div className="text-area-wrapper">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders three-column">
          <div className="thumb-image-uploader">
            <MyDropzone
              onDrop={this.handleThumbDrop}
              deleteImageFromServer={this.deleteImageFromServer}
              imgType="thumb"
              resetTrigger={this.state.resetTrigger}
              previousImg={this.state.previous_thumb_image}
              id={this.state.id}
            />
          </div>

          <div className="logo-image-uploader">
            <MyDropzone
              onDrop={this.handleLogoDrop}
              deleteImageFromServer={this.deleteImageFromServer}
              imgType="logo"
              resetTrigger={this.state.resetTrigger}
              previousImg={this.state.previous_logo}
              id={this.state.id}
            />
          </div>

          <div className="banner-image-uploader">
            <MyDropzone
              onDrop={this.handleBannerDrop}
              deleteImageFromServer={this.deleteImageFromServer}
              imgType="banner"
              resetTrigger={this.state.resetTrigger}
              previousImg={this.state.previous_banner_image}
              id={this.state.id}
            />
          </div>
        </div>

        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}

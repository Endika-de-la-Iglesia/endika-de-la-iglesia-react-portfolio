import React, { Component } from "react";
import axios from "axios";

import RichTextEditor from "../forms/rich-text-editor";
import MyDropzone from "../functional_component/dropzone-component";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      blog_status: "draft",
      content: "",
      blog_img: "",
      previous_blog_img: "",
      resetTrigger: false,
      editMode: this.props.editMode || false,
      apiUrl:
        "https://endikadelaiglesia.devcamp.space/portfolio/portfolio_blogs",
      apiAction: "post",
      callingComponent: this.props.callingComponent,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleRichTextEditorChange =
      this.handleRichTextEditorChange.bind(this);
    this.handleImgDrop = this.handleImgDrop.bind(this);
    this.resetFormState = this.resetFormState.bind(this);
    this.deleteImageFromServer = this.deleteImageFromServer.bind(this);
  }

  handleImgDrop(acceptedFiles, previousFile) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setState({
        blog_img: acceptedFiles[0],
      });
    } else if (previousFile) {
      this.setState({
        blog_img: previousFile,
      });
    } else if (acceptedFiles === null && previousFile === null) {
      this.setState({
        blog_img: "",
      });
    }
  }

  handleRichTextEditorChange(content) {
    this.setState({
      content,
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.blog_img) {
      formData.append("portfolio_blog[featured_image]", this.state.blog_img);
    }

    return formData;
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id || "",
        title: this.props.blog.title || "",
        blog_status: this.props.blog.blog_status || "draft",
        content: this.props.blog.content || "",
        previous_blog_img: this.props.blog.featured_image_url || "",
        apiAction: "patch",
      });

      console.log(this.state.content);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmission(event) {
    event.preventDefault();

    const { id, apiAction, apiUrl } = this.state;
    const formData = this.buildForm();

    const requestConfig = {
      withCredentials: true,
    };

    let request;

    if (apiAction === "post") {
      request = axios.post(apiUrl, formData, requestConfig);
    } else if (apiAction === "patch") {
      request = axios.patch(`${apiUrl}/${id}`, formData, requestConfig);
    }

    request
      .then((response) => {
        if (this._isMounted) {
          this.resetFormState();
          if (apiAction === "post") {
            this.props.handleSuccessfulFormSubmission(
              response.data.portfolio_blog
            );
          } else if (apiAction === "patch") {
            this.props.handleSuccessfulEditSubmission(
              this.state.editMode,
              response.data.portfolio_blog
            );
          }
        }
      })
      .catch((error) => {
        console.log("handleFormSubmission error", error);
      });
  }

  resetFormState() {
    this.setState(
      {
        id: "",
        title: "",
        blog_status: "draft",
        content: "",
        blog_img: "",
        previous_blog_img: "",
        resetTrigger: false,
        editMode: false,
      },
      () => {
        setTimeout(() => {
          if (this._isMounted) {
            this.setState({ resetTrigger: false });
          }
        }, 0);
      }
    );
  }

  deleteImageFromServer(id, imgTypeUrl) {
    const encodedId = encodeURIComponent(id);
    const encodedImgTypeUrl = encodeURIComponent(imgTypeUrl);

    let url = `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${encodedId}?image_type=${encodedImgTypeUrl}`;

    axios
      .delete(url, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 204) {
          return response.data.status
        }
      })
      .catch((error) => {
        console.error("deleteImageFromServer error", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmission} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="Blog Title"
            value={this.state.title}
          />

          <select
            className="select-element"
            name="blog_status"
            value={this.state.blog_status}
            onChange={this.handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="one-column">
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={
              this.props.editMode && this.props.blog.content
                ? this.props.blog.content
                : null
            }
          />
        </div>

        <div className="one-column">
          <div className="blog-img-uploader">
            <MyDropzone
              onDrop={this.handleImgDrop}
              deleteImageFromServer={this.deleteImageFromServer}
              imgType="blog image"
              resetTrigger={this.state.resetTrigger}
              previousImg={this.state.previous_blog_img}
              id={this.state.id}
            />
          </div>
        </div>

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    );
  }
}

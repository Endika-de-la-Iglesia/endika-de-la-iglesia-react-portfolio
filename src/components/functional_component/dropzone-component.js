import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyDropzone = ({
  onDrop,
  imgType,
  resetTrigger,
  previousImg,
  deleteImageFromServer,
  id,
}) => {
  const [preview, setPreview] = useState(previousImg);

  useEffect(() => {
    if (previousImg) {
      setPreview(previousImg);
    } else {
      setPreview(null);
    }
  }, [previousImg]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const removeImage = (resetTrigger) => {

    if (!resetTrigger) {
      if (typeof preview === "string" && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      } else if (typeof preview === "string" && !preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);

        let imgTypeUrl = "";

        if (imgType === "thumb") {
          imgTypeUrl = "thumb_image";
        } else if (imgType === "logo") {
          imgTypeUrl = "logo";
        } else if (imgType === "banner") {
          imgTypeUrl = "banner_image";
        } else if (imgType === "blog image") {
          imgTypeUrl = "featured_image";
        }

        if ((id !== "") | (id !== null)) {
          deleteImageFromServer(id, imgTypeUrl);
        }
      }
    }

    setPreview(null);
    onDrop(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
    noClick: preview !== null && preview !== undefined,
  });

  useEffect(() => {
    if (resetTrigger) {
      if (typeof preview === "string" && preview.length > 0) {
        removeImage(resetTrigger);
      }
    }
  }, [resetTrigger]);

  useEffect(() => {
    // Cleanup function to revoke the object URL
    return () => {
      if (typeof preview === "string" && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      className="custom-dropzone"
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {!preview ? (
        <>
          <h1>{imgType}</h1>
          <h2>
            <FontAwesomeIcon icon="fa-solid fa-file-image" size="xl" />
          </h2>
          <h3>JPG, PNG</h3>
          <p>Drop {imgType} image or click to select file</p>
        </>
      ) : (
        <div className="preview-image">
          <img src={preview} alt="Preview" />
          <button
            className="btn"
            onClick={() => {
              removeImage(resetTrigger);
            }}
            style={{ marginTop: "10px" }}
          >
            Remove {imgType}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDropzone;

// VideoUploadComponent.js

import { APIKitFormData } from "@/pages/api/config";
import React, { useState } from "react";

const VideoUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    console.log("selectedFile___________", selectedFile);
    //formData.append('videoFile', selectedFile);
    formData.append("file", selectedFile);
    formData.append("to", "mp4");
    formData.append("compress", "");
    formData.append("token", "7f136e6a5e469b01c22a858aafa7f977");

       upload_user_video_to_converter(formData);
        //upload_user_video(formData);
  };

  const upload_user_video = async (body) => {
     return await APIKitFormData.post(USER.UPLOAD_USER_VIDEO_TEST, body)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("UPLOAD_USER_VIDEO_TEST user data", error);
        if (error?.response) {
          return error?.response?.data;
        } else {
          return error;
        }
      });
  }
  const upload_user_video_to_converter = async (body) => {
    console.log("upload_user_video_to_converter", body);

    try {
      const response = await fetch(
        "https://api-tasker.onlineconvertfree.com/api/upload",
        {
          method: "POST",

          body: body,
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(
          "upload_user_video user data____________",
          data.CONVERTED_FILE
        );
        return data;
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (error) {
      console.error("upload_user_video user data", error);

      if (error instanceof Error && error.message) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    } 
  };

  return (
    <div>
      <h1>Video Upload</h1>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUploadComponent;

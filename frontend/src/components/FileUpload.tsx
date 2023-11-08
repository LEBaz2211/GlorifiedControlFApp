import React from "react";
import { uploadFile } from "../utils/api";

const FileUpload: React.FC = () => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      try {
        await uploadFile(files[0]);
        // TODO: Add any state updates or UI feedback after successful upload
        console.log("File uploaded successfully");
      } catch (error) {
        // TODO: Error handling logic
        console.error("Upload failed", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;

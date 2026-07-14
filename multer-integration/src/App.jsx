import axios from "axios";
import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "http://localhost:4000/api/post",
        formData
      );

      alert("Image uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white w-100 p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Image Upload
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Upload an image to the server
        </p>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl h-64 cursor-pointer hover:bg-blue-50 transition">

          {file ? (
            <>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="h-36 w-36 object-cover rounded-lg mb-3"
              />

              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </>
          ) : (
            <>
              <span className="text-6xl">📁</span>
              <p className="mt-3 text-gray-600">
                Click to choose an image
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
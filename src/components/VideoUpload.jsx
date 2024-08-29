import axios from "axios";
import { useState } from "react";

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileSelected, setFileSelected] = useState(false); // New state to track file selection

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileSelected(true); // Mark file as selected
      setProgress(0); // Reset progress when a new file is selected
      setMessage("File selected. Ready to upload.");
    }
  }

  function handleForm(event) {
    event.preventDefault();
    if (selectedFile) {
      saveVideoToServer();
    } else {
      setMessage("Please select a file to upload.");
    }
  }

  const formData = new FormData();
  formData.append('title', meta.title);
  formData.append('description', meta.description);
  formData.append('file', selectedFile);

  async function saveVideoToServer() {
    setUploading(true);
    setProgress(0);
    try {
      await axios.post("http://localhost:8080/api/v1/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total > 0) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            setProgress(percentCompleted);
          }
        },
      });
      setMessage("Upload successful");
    } catch (error) {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
      setFileSelected(false); // Reset file selection state
    }
  }

  return (
    <div className="w-full flex justify-center py-5">
      <form onSubmit={handleForm} className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <div className="p-5">
          <input
            type="text"
            onChange={(e) => setMeta({ ...meta, title: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Title.."
            required
          />
        </div>
        <div className="p-5">
          <textarea
            onChange={(e) => setMeta({ ...meta, description: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="flex items-center justify-center p-5">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">.mp4</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {fileSelected && (
          <div className="p-5">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div className="flex justify-center p-5">
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {message && <div className="text-center p-4 text-green-600 font-semibold">{message}</div>}
      </form>
    </div>
  );
}

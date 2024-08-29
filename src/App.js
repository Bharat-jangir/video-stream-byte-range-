import logo from "./logo.svg";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import { useState } from "react";

function App() {
  const [videoId, setVideoId] = useState("490d6535-b511-4481-9214-5ade616cd029");

  return (
    <div className="bg-black">
      <h1 className="text-xl font-thin text-center">
        Welcome to Video Streaming App
      </h1>
      <div className="flex flex-row-reverse w-full p-10">
        <div className="flex-1 bg-green-800 p-4" style={{ flex: '0 0 50%' }}>
          <VideoUpload />
        </div>
        <div className="flex-1 p-4" style={{ flex: '0 0 50%' }}>
          <video className="w-full" controls style={{ maxWidth: '100%', maxHeight: '500px' }}>
            <source src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default App;

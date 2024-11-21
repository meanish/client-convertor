import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setStatus("Converting...");

    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob();
      console.log("blob", blob)
      const url = window.URL.createObjectURL(blob);

      // link to download the file
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_audio.mp3";
      a.click();

      setStatus("Conversion Successful! Audio downloaded.");
    } catch (err) {
      console.error(err);
      setStatus("An error occurred during conversion.");
    }
  };

  return (
    <div>
      <h1>Video to Audio Converter</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert to Audio</button>
      <p>{status}</p>
    </div>
  );
}

export default App;

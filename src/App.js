import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState({
    gender: "loading...",
    age: "loading...",
  });
  const [img, setImage] = useState("");

  const callBackEnd = async () => {
    fetch("http://127.0.0.1:5000/detector")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  };

  useEffect(() => {
    callBackEnd();
    setTimeout(() => {
      setImage("http://localhost:5000/video_feed");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        background: "yellow",
      }}
    >
      <div style={{ width: "60%", padding: "5rem" }}>
        <div>
          <img src={img} alt="Video" />
        </div>
      </div>
      <div style={{ width: "60%", padding: "5rem" }}>
        <div>
          <div>Gender : {userData.gender}</div>
          <div>Age : {userData.age}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

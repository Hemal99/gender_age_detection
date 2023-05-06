import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState({
    gender: "loading...",
    age: "loading...",
  });
  const [img, setImage] = useState("");

  const callBackEnd = async () => {
    fetch("http://127.0.0.1:5000/api/v1/hci/detector")
      .then((response) => response.json())
      .then((data) => setUserData(data));
   
  };
  const save_user = async () => {
    const body={gender:userData.gender,age:userData.age}
    fetch('http://127.0.0.1:5000/api/v1/hci/user', {
      Method: 'POST',
      Headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      Body: body,
      Cache: 'default'
    })
   
  };

  useEffect(() => {
    callBackEnd();
    setTimeout(() => {
      setImage("http://localhost:5000/api/v1/hci/video_feed");
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
        <div>
          <button onClick={save_user}>

            save_user
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;


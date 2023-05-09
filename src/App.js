import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState({
    gender: "loading...",
    age: "loading...",
  });
  const [img, setImage] = useState("");

  const callBackEnd = async () => {
    try {
      fetch("http://127.0.0.1:5000/api/v1/hci/detector")
        .then((response) => response.json())
        .then((data) => setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };
  const save_user = async () => {
    const body = { gender: userData.gender, age: userData.age };
    // fetch("http://127.0.0.1:8001/api/v1/hci/user", {
    //   Method: "POST",
    //   Headers: {
    //     Accept: "application.json",
    //     "Content-Type": "application/json",
    //   },
    //   Body: body,
    //   Cache: "default",
    // });

    await fetch("http://127.0.0.1:8001/admin/user", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });
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
          <button onClick={save_user}>save_user</button>
        </div>
      </div>
    </div>
  );
}

export default App;

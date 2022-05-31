import st from "./UploadPanel.module.css";
import axios from "axios";
import RoundButton from "../Reusable/RoundButton";
import { useState } from "react";
import Loader from "../Reusable/Loader";
const UploadPanel = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = () => {
    const a = document.querySelector("#uploadbutton");
    a.click();
  };

  const onUpload = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      if (image) {
        console.log(image);
        const form = new FormData();
        form.append("photo", image);
        const resp = await axios.post("/api/upload", form);
        if (resp) {
          console.log(resp.data);
          setUploadedPhoto(resp.data);
        }
      } else throw new Error();
    } catch (error) {
      console.log("error occured");
    }
    setLoading(false);
  };
  return (
    <>
      <div className={st.panel}>
        <h2 className={st.text}>Upload pictures of your attire to remove background</h2>
        <RoundButton style={{ fontSize: "2rem", backgroundColor: "dodgerblue", color: "white" }} onClick={upload}>
          Upload
        </RoundButton>
        <input type="file" id="uploadbutton" name="avatar" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => onUpload(e)} />
      </div>
      {uploadedPhoto && !loading && <img src={`data:image/png;base64,${uploadedPhoto}`} alt="" className={st.removedbg} />}
      {loading && <Loader />}
    </>
  );
};

export default UploadPanel;

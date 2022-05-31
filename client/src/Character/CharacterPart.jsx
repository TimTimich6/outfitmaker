import axios from "axios";
import { useRef, useState } from "react";
import Loader from "../Reusable/Loader";
import cl from "./CharacterPart.module.css";
const CharacterPart = (props) => {
  const buttonRef = useRef();
  const [loading, setLoading] = useState(false);
  const upload = () => {
    buttonRef.current.click();
  };

  const onUpload = async (e) => {
    // setLoading(true);
    try {
      const image = e.target.files[0];
      if (image) {
        console.log(image);
        const form = new FormData();
        form.append("photo", image);
        const resp = await axios.post("/api/upload", form);
        if (resp) {
          console.log(resp.data);
          props.update(resp.data);
          buttonRef.current.value = "";
        }
      } else throw new Error();
    } catch (error) {
      console.log("error occured");
    }
    // setLoading(false);
  };
  return (
    <>
      {!props.state && <div className={`${cl.total} ${cl.template} ${cl[props.cl]}`} onClick={upload}></div>}
      <input type="file" ref={buttonRef} name="avatar" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => onUpload(e)} />
      {props.state && !loading && (
        <img src={`data:image/png;base64,${props.state}`} alt="" className={`${cl[props.cl]} ${cl.image}`} onClick={upload} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default CharacterPart;

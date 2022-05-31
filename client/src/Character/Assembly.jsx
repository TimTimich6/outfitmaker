import cl from "./Assembly.module.css";
import CharacterPart from "./CharacterPart";
import RoundButton from "../Reusable/RoundButton";
import { useState } from "react";
const Assembly = (props) => {
  const [head, setHead] = useState("");
  const [shirt, setShirt] = useState("");
  const [pants, setPants] = useState("");
  const [shoes, setShoes] = useState("");

  const resetClothes = () => {
    setHead("");
    setShirt("");
    setPants("");
    setShoes("");
  };
  return (
    <div className={cl.total}>
      <RoundButton style={{ fontSize: "1.5rem", backgroundColor: "gray", color: "white", marginBottom: "2rem" }} onClick={resetClothes}>
        Reset Clothes
      </RoundButton>
      <CharacterPart cl="head" state={head} update={setHead} />
      <CharacterPart cl="shirt" state={shirt} update={setShirt} />
      <CharacterPart cl="pants" state={pants} update={setPants} />
      <CharacterPart cl="shoes" state={shoes} update={setShoes} />
    </div>
  );
};

export default Assembly;

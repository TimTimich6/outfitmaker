import st from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={st.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

import st from "./RoundButton.module.css";
const ReusableButton = (props) => {
  return (
    <button className={st.button} style={props.style} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ReusableButton;

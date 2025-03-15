import { useDispatch, useSelector } from "react-redux";
import messageReducer, { showMessage } from "../reducers/messageReducer";

const Notification = () => {
  const notification = useSelector((state) => state.message);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;

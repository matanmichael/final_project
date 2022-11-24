import React, { useState } from "react";
import {  useSelector,useDispatch } from "react-redux";
import {
  selectAdmin,
  doSignupAsync,
  selectStaff,
 
} from "./loginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
const Register = () => {
  const [admin, setAdmin] = useState(false);
  const isAdmin = useSelector(selectAdmin);
  const [staff, setStaff] = useState(false);
  const isStaff = useSelector(selectStaff);
  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const notify = () => toast("Welcome - your registration is complete!");
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      <h3>SIGN-UP</h3>
      User Name{" "}
      <input
        type="text"
        placeholder="enter a username"
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <hr />
      Password{" "}
      <input
        type="password"
        placeholder="enter a password"
        onChange={(e) => setNewPwd(e.target.value)}
      />
      <hr />
      E-mail{" "}
      <input
        type="email"
        placeholder="enter an email"
        onChange={(e) => setNewEmail(e.target.value)}
      /><hr />
       {isAdmin && (
        <div>
          admin:{" "}
          <input type="checkbox" onChange={(e) => setAdmin(e.target.checked)} />
          <input type="checkbox" onChange={(e) => setStaff(e.target.checked)} />
        </div>
      )}
      <Button variant="primary"
        onClick={() => {
          {
            notify();
          }
          dispatch(
            doSignupAsync({
              username: newUserName,
              password: newPwd,
              email: newEmail,
              admin: admin,
              staff: staff,
            })
          );
        }}
      >
       
        register <ToastContainer />
      </Button>
    </div>
  );
};

export default Register;

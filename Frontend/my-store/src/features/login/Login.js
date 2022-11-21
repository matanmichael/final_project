import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doSigninAsync,
  selectEmail,
  selectUserName,
  selectToken,
  selectAdmin,
} from "./loginSlice";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Login = () => {
  const isAdmin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  const token = useSelector(selectToken);
  const [admin, setAdmin] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newEmail, setNewEmail] = useState("");
 
  return (
    <div>
      {userName && <div>hello: {userName}</div>}
      {email && <div> Email: {email}</div>}
      
      <h1>Welcome!</h1>
      <h3>Sign in or create your account:</h3>
            
      <hr />
      User Name <input  type="text" placeholder="enter a username" onChange={(e) => setNewUserName(e.target.value)} />
      <hr />
      Password{" "}
      <input type="password" placeholder="enter a password" onChange={(e) => setNewPwd(e.target.value)} />
      <hr />
      E-mail{" "}
      <input type="email" placeholder="enter an email" onChange={(e) => setNewEmail(e.target.value)} />
      
      <hr />
      
      <Button variant="primary"
        onClick={() =>
          dispatch(doSigninAsync({ username: newUserName, password: newPwd }))
        }
      >
        Login
      </Button>
     <h2>Create your account:</h2>
     <Link to="/register">
        <Button variant="primary">Sign-Up</Button>
      </Link>
    </div>
  );
};

export default Login;

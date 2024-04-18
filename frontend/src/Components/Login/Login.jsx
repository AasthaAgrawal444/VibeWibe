import React, { useState, useEffect } from "react";
import "./Login.css";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from "../../Actions/User";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      toast.success(message, {
        position: "bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          VibeWire
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Login;

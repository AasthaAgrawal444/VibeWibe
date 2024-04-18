import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector((state) => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position:"bottom-center",
                transition: Bounce,
                closeOnClick: true,
              });
              dispatch({ type: "CLEAR_ERRORS"});
        }
    
        if (message) {
            toast.success(message, {
                position:"bottom-center",
                transition: Bounce,
                closeOnClick: true,
              });
              dispatch({ type: "CLEAR_MESSAGE"});
        }
      }, [dispatch, error, message]);
    
  return (
    <div className="forgotPassword">
    <form className="forgotPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        VibeWire
      </Typography>

      <input
        type="email"
        placeholder="Email"
        required
        className="forgotPasswordInputs"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Send Token
      </Button>
    </form>
    <ToastContainer autoClose={5000} />
  </div>
  );
}

export default ForgotPassword

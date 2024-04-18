import React, { useEffect, useState } from 'react';
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import { Button, Typography } from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };


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
    <div className="resetPassword">
    <form className="resetPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        VibeWire
      </Typography>

      <input
        type="password"
        placeholder="New Password"
        required
        className="updatePasswordInputs"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Link to="/">
        <Typography>Login</Typography>
      </Link>
      <Typography>Or</Typography>

      <Link to="/forgot/password">
        <Typography>Request Another Token!</Typography>
      </Link>

      <Button disabled={loading} type="submit">
        Reset Password
      </Button>
    </form>
    <ToastContainer autoClose={5000} />
    </div>
  )
}

export default ResetPassword

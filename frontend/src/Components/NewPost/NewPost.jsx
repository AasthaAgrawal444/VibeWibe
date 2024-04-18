import React, { useEffect, useState } from 'react';
import "./NewPost.css";
import { Typography, Button } from '@mui/material';
// import { set } from 'mongoose';
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { createNewPost } from '../../Actions/Post';
import { loadUser } from '../../Actions/User';


const NewPost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const {loading, error, message} = useSelector((state) => state.like);
    const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
        if(Reader.readyState===2) {
            setImage(Reader.result);
        }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  }

  useEffect(()=> {
    if(error) {
      toast.error(error, {
        // position: toast.POSITION.BOTTOM_CENTER,
        position:"bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_ERRORS"});
    }
    if(message){
      toast.success(message, {
        position:"bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_MESSAGE"});
    }
    
  }, [dispatch, error, message]);

  return (
    <div className='newPost'>
      <form className='newPostForm' onSubmit={submitHandler}>
        <Typography variant='h3'>New Post</Typography>

        {image && <img src={image} alt='post'/>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input type="text" placeholder="caption..." value={caption} onChange={(e) => setCaption(e.target.value)}/>
        <Button disabled={loading} type='submit'>Post</Button>
      </form>
      <ToastContainer autoClose={5000} />
    </div>
  )
}

export default NewPost

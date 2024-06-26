import React, { useEffect } from "react";
import "./Home.css";
import Post from "../Post/Post";
import User from "../User/User";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  const dispatch = useDispatch();
  

  const {loading, posts, error} = useSelector(
    (state) =>state.postOfFollowing);


  const { users, loading: usersLoading }  = useSelector(
    (state) => state.allUsers);

  const {error: likeError, message} = useSelector((state) => state.like);
  
  useEffect(()=> {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());

   }, [dispatch]);

   useEffect(() => {
    if(error) {
      toast.error(error, {
        position: "bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_ERRORS"});
    }
    if(likeError){
      toast.error(likeError, {
        position: "bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_ERRORS"});
    }
    if(message){
      toast.success(message, {
        position: "bottom-center",
        transition: Bounce,
        closeOnClick: true,
      });
      dispatch({ type: "CLEAR_MESSAGE"});
    }
      }, [error, message, likeError, dispatch]);


  return (loading === true || usersLoading === true) ? ( <Loader /> ) : (
    <div className="home">
      <div className="homeleft">
      {
        posts && posts.length > 0 ? ( 
          posts.map((post)=>(
      <Post 
          key={post._id}
          postId={post._id}
          caption={post.caption}
          postImage={post.image.url}
          likes = {post.likes}
          comments = {post.comments}
          ownerImage={post.owner.avatar.url}
          ownerName={post.owner.name}
          ownerId={post.owner._id}
        />
        )) 
        ) : (<Typography variant="h6">No posts yet</Typography> )
      }
      </div>
      <div className="homeright">
       {
        users && users.length > 0 ? (
          users.map((user) => (
          <User
          key={user._id}
          userId={user._id}
          name={user.name}
          avatar={user.avatar.url}
          />
        )) 
       ) : (<Typography>No Users Yet</Typography>)
       }
      </div>
      <ToastContainer autoClose={5000} />
    </div>
    
  );
};

export default Home;



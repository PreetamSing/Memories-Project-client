import React, { useContext, useState } from "react";
import * as api from '../api/index.js';
import firebase from '../firebase';
import "firebase/messaging"

const PostContext = React.createContext()

export function usePost() {
  return useContext(PostContext)
}

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([])

  async function sendMessagingToken() {
    const messaging = firebase.messaging();

    messaging.getToken({ vapidKey: "BIdHu5NyHNZE8GTdvBrtXE_mJKGK-J27D7QnhwkAbNnMCI2wwO3qXvfPfXugJdoZsT1pIK8KuKVWAMinA4kO9RU" })
      .then(currentToken => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          console.log(currentToken)
          api.storeMessageToken(currentToken);
          messaging.onMessage(payload => {
            console.log("Message Received", payload);
          })
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }

  const getPosts = async (setError) => {
    try {
      setError("");
      const { data } = await api.fetchPosts();
      setPosts(data);
    } catch (error) {
      setError(error?.message);
    }
  }

  const createPost = async (post, setError) => {
    try {
      setError("");
      const { data } = await api.createPost(post);
      setPosts(prevPosts => [...prevPosts, data]);
    } catch (error) {
      setError(error?.message);
    }
  }

  const updatePost = async (id, post, setError) => {
    try {
      setError("");
      const { data } = await api.updatePost(id, post);
      setPosts(prevPosts => prevPosts.map((post) => post._id === data._id ? data : post));
    } catch (error) {
      setError(error?.message);
    }
  }

  const deletePost = async (id, setError) => {
    try {
      setError("");
      await api.deletePost(id);
      setPosts(prevPosts => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      setError(error?.message);
    }
  }

  const likePost = async (id, setError) => {
    try {
      setError("");
      const { data } = await api.likePost(id);
      setPosts(prevPosts => prevPosts.map((post) => post._id === data._id ? data : post));
    } catch (error) {
      setError(error?.message);
    }
  }


  const value = {
    posts,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    sendMessagingToken
  }

  return (
    <PostContext.Provider value={value}>
      { children}
    </PostContext.Provider>
  )
}

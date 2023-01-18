import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE} from '../constants/actionTypes'
import * as api from '../api';


//functions for actions
export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.urlPosts();

      //logic of FETCH_ALL is written in ./reducer/posts.js  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
  try{
      const {data} = await api.createPost(post);
      dispatch({type: CREATE, payload: data});
  } catch(error){
      console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try{
    //get data for updated post
    const {data} = await api.updatePost(id, post);

    dispatch({type: UPDATE, payload: data });
  } catch(error){
    console.log(error);
  }
  
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try{
    //get data for post
    const {data} = await api.likePost(id);

    dispatch({type: LIKE, payload: data });
  } catch(error){
    console.log(error);
  }
  
};


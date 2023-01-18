import React from "react";
import Post from './Post/Post'

import { useSelector } from "react-redux";
import { Grid, CircularProgress} from '@material-ui/core';

import myStyle from './styles';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const myClass= myStyle();

    console.log(posts);

    return(
        !posts.length ? <CircularProgress /> : (
            <Grid className={myClass.container} container alignItems="stretch" spacing={3}>
                {posts.map((post)=> (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}

            </Grid>
        )
    );
    
}

export default Posts;
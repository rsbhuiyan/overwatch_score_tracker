import React from "react";
import myStyle from './styles';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";


import damage from './images/damage.png';
import heal from './images/heal.png';

const Post = ({post, setCurrentId }) => {
    const myClass= myStyle();
    const dispatch = useDispatch();
    const nameUser = JSON.parse(localStorage.getItem('profile'));

    //line 77
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (nameUser?.result?.googleId || nameUser?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };


    return(
        <Card className={myClass.card}>
             <CardMedia className={myClass.media} image={post.selectedFile} hero={post.hero} />
            <div className={myClass.overlay}>
                <Typography variant="h4"><b>{post.hero}</b></Typography>

                <Typography variant="body1">{post.name}</Typography>

            </div>

            {(nameUser?.result?.googleId === post?.creator || nameUser?.result?._id === post?.creator) && (
            <div className={myClass.overlay2}>
                <Button style={{ color: 'orange' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>

            </div>)
            }

          
            <CardContent>
                <div className={myClass.overlay3}>
                 <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

                </div>
                <Typography className={myClass.title} variant="h3" style={{color: 'rgba(225,6,0)'}} gutterButton>
                    <img className={myClass.image} src={damage} alt="damage" height="47" />
                    <b>:  </b> 
                    <b>{post.damage}</b> 
                </Typography>
            </CardContent>

            <CardContent>
                <Typography className={myClass.title} variant="h3" style={{color: 'rgba(0,154,23)'}} gutterButton>
                    <img className={myClass.image} src={heal} alt="heals" height="47" />
                    <b>:  </b> 
                    <b>{post.heals}</b> 
                </Typography>
            </CardContent>

            <CardActions className= {myClass.cardActions}>
                <Button size="small" color="primary" disabled={!nameUser?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(nameUser?.result?.googleId === post?.creator || nameUser?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>)
                }

            </CardActions>

        </Card>
    )
}

export default Post;
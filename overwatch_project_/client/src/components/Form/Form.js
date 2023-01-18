import React, {useState, useEffect} from "react";
import myStyle from './styles';

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';

import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';

//pictures
import damage from './images/damage.png';
import heal from './images/heal.png';
import arrow from './images/arrow.png';


const Form = ({currentId, setCurrentId}) => {
    const classes= myStyle();
    const nameUser = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState(
        {
            hero: '',
            damage:'',
            heals:'',
            selectedFile:''

        });
    
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (event) => {

        event.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: nameUser?.result?.name }));
            clear();
        } 

        else {
            dispatch(updatePost(currentId, { ...postData, name: nameUser?.result?.name }));
            clear();
        }
    }

    const clear = () =>{
        setCurrentId(0);
        setPostData({hero: '', damage: '', heals: '', selectedFile: '' });

    }

    if(!nameUser?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to post your scores and interact with other posts.
                </Typography>
            </Paper>
        )
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" style={{color: '#2A3439'}} noValidate className={`${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h4">
                    <b><u>{currentId ? 'Edit' : 'Post'} Your Score</u></b>
                </Typography>

                <TextField
                    name="hero"
                    variant="outlined"
                    label="Hero"
                    fullWidth
                    value={postData.hero}
                    onChange={(event) => setPostData({...postData, hero: event.target.value})}
                />

                <TextField
                    name="damage"
                    variant="outlined"
                    label="Damage"
                    full Width
                    value={postData.damage}
                    onChange={(event) => setPostData({...postData, damage: event.target.value})}
                />
                <img className={classes.image} src={damage} alt="heals" height="50" />


                <TextField
                    name="heals"
                    variant="outlined"
                    label="Heals"
                    full Width
                    value={postData.heals}
                    onChange={(event) => setPostData({...postData, heals: event.target.value})}
                />
                <img className={classes.image} src={heal} alt="heals" height="50" />

                <div className="classes.fileInput">
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData,selectedFile:base64})}
                    />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    <b><i> Submit </i></b> 
                </Button>

                <Button variant="contained" color='rgba(33,143,254,.7)' size="small" onClick={clear} fullWidth>
                    <b><i> Clear </i></b> 
                </Button>


            </form>
        </Paper>
    )
}

export default Form;

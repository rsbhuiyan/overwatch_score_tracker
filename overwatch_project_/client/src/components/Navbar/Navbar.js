import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';

//import picture of heroes we downloaded in images file and assign it to variables
import logo from '../../images/logo.png';
import lucio from '../../images/lucio.png';
import lucio1 from '../../images/lucio1.png';
import moira from '../../images/moira.png';
import mcree from '../../images/mcree.png';
import soldier76 from '../../images/76.png';

//get style format
import myStyle from './styles';

const Navbar = () => {
    const myClass= myStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //fetch user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
    
        if(token){
            const decodeTkn = decode(token);
            if(decodeTkn.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    
    return (
        <AppBar className={myClass.appBar} position="static" color="inherit">
                    
            <div className={myClass.brandContainer}>
                <img className={myClass.image} src={logo} alt="logo" height="60" />
                <Typography component={Link} to= "/" className={myClass.heading} variant="h2" align="center">
                    <b><i>verwatch Scores</i></b>
                </Typography>
                <img className={myClass.image} src={lucio} alt="sigma" height="38" />
                <img className={myClass.image} src={lucio1} alt="lucio" height="38" />
                <img className={myClass.image} src={moira} alt="moira" height="38" />
                <img className={myClass.image} src={mcree} alt="mcree" height="38" />
                

            </div> 
            <Toolbar className={myClass.toolbar}>
                {user ? (
                    <div className={myClass.profile}>
                        <Avatar className={myClass.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={myClass.userName} variant='h6'>
                        {user.result.name}
                        </Typography>
                        <Button variant="contained" className={myClass.logout} color="primary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>      

                    
        </AppBar>
    );
    };

export default Navbar;
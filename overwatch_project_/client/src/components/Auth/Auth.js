import React , {useState, useEffect} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';

import myStyle from './styles';
import tank from '../../images/tank.png';
import Icon from './iconG';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';

import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {signin, signup} from '../../actions/auth';

//inputs settings used in line 31<
import Input from './input';

const loginState = {firstName: '', lastName: '', email: '', password: '', consfirmPassword: ''};
export const Auth = () => {
  const clientId="813200302334-jh4h9ei9qm0qi16dm0jo5t03pqblp01d.apps.googleusercontent.com"
  const myClass = myStyle();
  const [isSigned, setIsSigned] = useState(false);
  const [formData, setFormData] = useState(loginState);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  //variable to handle show password in line 47
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(isSigned){
      dispatch(signup(formData, navigate));
    }
    else{
      dispatch(signin(formData, navigate));

    }
  }; 

  const handleChange = (e) => {
    //set user input to each calue in loginState <- line 16
    setFormData({...formData, [e.target.name]: e.target.value });
  }; 

  const switchInput = () => {
    setIsSigned((prevIsSigned) => !prevIsSigned);
    setShowPassword(false);
  }; 

  useEffect(() => {
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:clientId})
    })
  },[])

  const gSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: {result, token} });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }; 

  //login error
  const gFailure = (error) => {
      console.log("Google Log in Fail. Please Try again.");
  }; 

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); 
  return (
    <Container component='main' maxWidth="xs">
      <Paper className={myClass.paper} elevation={3}>
        <Avatar className={myClass.avatar}>
          <img className={myClass.image} src={tank} alt="sigma" height="40" />
        </Avatar>

        <Typography variant='h5'>
          {isSigned ? 'Sign Up' : 'Sign In'}
        </Typography>

        <form className={myClass.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                { isSigned && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSigned && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>

            <Button type='submit' fullWidth variant='contained' color='primary' className={myClass.submit}>
              {isSigned ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
              clientId="813200302334-jh4h9ei9qm0qi16dm0jo5t03pqblp01d.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={myClass.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={gSuccess}
              onFailure={gFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
               
                <Button onClick={switchInput}>
                    {isSigned ? "Sign In" : "Sign Up" }
                </Button>
              </Grid>

            </Grid>
        </form>

      </Paper>
    </Container>
  );
};

export default Auth;

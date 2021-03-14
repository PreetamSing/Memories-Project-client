import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { signin } from '../../../actions/auth';

const GoogleSignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleChange = (e) => {
        setPassword( e.target.value )
    }

    const googleSuccess = async (res) => {
        // const result = res?.profileObj;
        // const token = res?.tokenId;

        try {
            dispatch(signin({
                email: res?.profileObj?.email,
                password: password,
                googleId: res?.profileObj?.googleId
            }, history));

            history.push('/memories');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try Again Later");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Password Please!</Typography>
                <Typography variant="p">It will be asked only the first time you login with Google</Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <GoogleLogin
                        clientId="87503749021-65pm7l1e3b3f7h2ln4irrv9rkui8sl44.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" style={{ marginTop: "20px" }} >Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </form>
            </Paper>
        </Container>
    )
}

export default GoogleSignIn

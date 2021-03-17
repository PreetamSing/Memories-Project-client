import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { signup } from '../../../actions/auth';

const initialState = {
    password: '',
    confirmPassword: ''
}

const GoogleSignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [mismatchedPassword, setMismatchedPassword] = useState(true);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (formData.password === formData.confirmPassword) {
            setMismatchedPassword(false);
        }
        else {
            setMismatchedPassword(true);
        }
    }, [formData])

    const googleSuccess = async (res) => {
        
        try {
            dispatch(signup({
                firstName: res?.profileObj?.givenName,
                lastName: res?.profileObj?.familyName,
                email: res?.profileObj?.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                googleId: res?.profileObj?.googleId
            }, history));
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign Up was unsuccessful. Try Again Later");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign Up</Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    </Grid>
                    {mismatchedPassword && (
                        <Typography variant="body2" color="error" component="p">
                            Passwords don't match
                        </Typography>
                    )}
                    <GoogleLogin
                        clientId="73172241162-j09pe7bqh7u8g5ld3b56aec4bp2clkun.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={mismatchedPassword || !formData.password} startIcon={<Icon />} variant="contained" style={{ marginTop: "20px" }} >Sign Up</Button>
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

export default GoogleSignUp

import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from "@material-ui/core";
import { useHistory, Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useAuth } from "../../../contexts/AuthContext"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    googleId: ''
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
    const { signup, login, googleSignIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                return setError("Passwords do not match");
            }
            signup(formData, setError, setLoading, history);
        }
        else {
            login(formData, setError, setLoading, history);
        }
    }

    const handleGoogleSignIn = () => {
        googleSignIn(setError, setLoading, history);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    if (loading) {
        return (<Grid container justify="center" style={{ height: "100vh" }} alignContent="center">
            <CircularProgress size={60} thickness={4.5} />
        </Grid>)
    }

    return (
        <>
        <Alert severity="info">You need to authenticate to use the web app. Only your email address and Name would be used, just for the sake of identification.</Alert>
            {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? "Sign Up" : "Sign In"}</Button>
                    </form>
                    <Button className={classes.googleButton} color="primary" fullWidth startIcon={<Icon />} variant="contained" onClick={handleGoogleSignIn} >Google Sign {isSignup ? "Up" : "In"}</Button>
                    {!isSignup && <Grid container justify="flex-start">
                        <Button component={Link} to="/forgot-password" href="#text-buttons" color="primary">
                            Forgot Password?
                        </Button>
                    </Grid>}
                    <Grid container justify="flex-end" >
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            </>
    )
}

export default Auth

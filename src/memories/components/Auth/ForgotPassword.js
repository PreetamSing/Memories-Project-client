import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useAuth } from "../../../contexts/AuthContext"

const ForgotPassword = () => {
    const classes = useStyles();
    const { resetPassword } = useAuth()
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword(email, setSuccess, setError, setLoading)
    }

    if (loading) {
        return (<Grid container justify="center" style={{ height: "100vh" }} alignContent="center">
            <CircularProgress size={60} thickness={4.5} />
        </Grid>)
    }

    return (
        <>
            { error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            { success && <Alert severity="success" onClose={() => { setSuccess('') }}>{success}</Alert>}
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Enter Your Email</Typography>
                    <form className={classes.form} onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        </Grid>
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} type="submit">Reset Password</Button>
                    </form>
                    <Grid container justify="flex-start">
                        <Button component={Link} to="/auth" href="#text-buttons" color="primary">
                            Go to Sign In
                    </Button>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default ForgotPassword

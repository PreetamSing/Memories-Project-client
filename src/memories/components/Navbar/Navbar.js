import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';
import memories from '../../../images/memories.jpg';
import { useAuth } from "../../../contexts/AuthContext"

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth()
    const matches = useMediaQuery('(max-width:600px)');

    let displayName;
    if (currentUser) {
        displayName = currentUser?.displayName ? currentUser?.displayName : currentUser?.email;
    }
    if (displayName?.length > 10) {
        displayName = displayName.split(/[^A-Z,a-z]/)[0];
    }

    const AppTitle = () => (
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/memories" className={classes.heading} variant={matches ? "h3" : "h2"} align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height={matches ? "45" : "60"} />
        </div>
    );
    const ExtraNavbar = () => (
        <Toolbar className={classes.toolbar}>
            {currentUser ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={currentUser.displayName} src={currentUser.photoURL}>{currentUser.email.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{displayName}</Typography>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
    );

    const handleLogout = () => {
        logout(setError, history);
    }

    return (
        <>
            { error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <AppBar className={classes.appBar} position="static" color="inherit">
                <AppTitle />
                {!matches && <ExtraNavbar />}
            </AppBar>
            { matches && <AppBar className={classes.extraAppBar} position="static" color="inherit"><ExtraNavbar /></AppBar>}
        </>
    )
}

export default Navbar

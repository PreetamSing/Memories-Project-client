import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';
import memories from '../../../images/memories.jpg';
import { LOGOUT } from '../../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const matches = useMediaQuery('(max-width:600px)');

    const AppTitle = () => (
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/memories" className={classes.heading} variant={matches?"h3":"h2"} align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height={matches?"45":"60"} />
        </div>
    );
    const ExtraNavbar = () => (
        <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
    );

    const logout = () => {
        dispatch({ type: LOGOUT });

        history.push('/memories');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        // JWT...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <AppTitle />
            { !matches && <ExtraNavbar /> }
        </AppBar>
        { matches && <AppBar className={classes.extraAppBar} position="static" color="inherit"><ExtraNavbar /></AppBar> }
        </>
    )
}

export default Navbar

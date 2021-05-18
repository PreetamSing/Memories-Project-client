import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grow, Grid } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';
import firebase from '../../../firebase';
import 'firebase/messaging';

import Navbar from '../Navbar/Navbar';
import { usePost } from '../../../contexts/PostContext';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [error, setError] = useState('');
    const { getPosts, sendMessagingToken } = usePost();
    const matches = useMediaQuery('(max-width:600px)');

    const PostsFunc = useCallback(() => <Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId} /></Grid>, [Posts])
    const FormFunc = useCallback(() => <Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId} /></Grid>, [Form])
    console.log("In Home.js");
    useEffect(() => {
        getPosts(setError);
    }, [])
    useEffect(() => {
        sendMessagingToken();
    }, [])

    return (
        <Container maxWidth="lg" >
            {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <Navbar />
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        {matches ? <><FormFunc /><PostsFunc /></> : <><PostsFunc /><FormFunc /></>}
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default Home

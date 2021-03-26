import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';

import Navbar from '../Navbar/Navbar';
import { usePost } from '../../../contexts/PostContext';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [error, setError] = useState('');
    const { getPosts } = usePost();
    const matches = useMediaQuery('(max-width:600px)');

    const PostsFunc = () => <Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId} /></Grid>
    const FormFunc = () => <Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId} /></Grid>

    useEffect(() => {
        getPosts(setError);
    }, [])

    return (
        <>
        {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <Navbar />
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        { matches ? <><FormFunc /><PostsFunc /></> : <><PostsFunc /><FormFunc /></>}
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home

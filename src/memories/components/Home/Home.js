import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Navbar from '../Navbar/Navbar';
import { getPosts } from '../../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width:600px)');

    const PostsFunc = () => <Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId} /></Grid>
    const FormFunc = () => <Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId} /></Grid>

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <>
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

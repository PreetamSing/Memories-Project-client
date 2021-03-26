import React from 'react'
import { Grid, CircularProgress } from "@material-ui/core";

import { usePost } from '../../../contexts/PostContext';
import Post from './Post/Post'
import useStyles from './styles';

export default function Posts({ setCurrentId }) {
    const { posts } = usePost();
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

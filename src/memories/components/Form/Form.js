import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import { useAuth } from "../../../contexts/AuthContext"
import useStyles from './styles';
import { usePost } from '../../../contexts/PostContext';

export default function Form({ currentId, setCurrentId }) {
    const classes = useStyles();
    const { posts, createPost, updatePost } = usePost();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const post = currentId ? posts.find((p) => p._id === currentId) : null;

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        const displayName = currentUser?.displayName ? currentUser?.displayName : currentUser?.email.split(/[^A-Z,a-z]/)[0];
        if (currentId) {
            updatePost(currentId, { ...postData, name: displayName }, setError);
        }
        else {
            createPost({ ...postData, name: displayName }, setError);
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    return (
        <Paper className={classes.paper}>
            {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{ currentId ? "Editing" : "Creating" } a Memory!</Typography>

            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

            <TextField name="tags" variant="outlined" label="Tags (comma seperated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64})}
                />
            </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

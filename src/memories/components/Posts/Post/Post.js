import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';
import { usePost } from '../../../../contexts/PostContext';
import { useAuth } from "../../../../contexts/AuthContext";

export default function Post({ post, setCurrentId }) {
    const classes = useStyles();
    const { deletePost, likePost } = usePost();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (currentUser?.uid))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card}>
            {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay} >
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(currentUser?.uid === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!currentUser?.uid} onClick={() => likePost(post._id, setError)}>
                    <Likes />
                </Button>
                {(currentUser?.uid === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => deletePost(post._id, setError)}>
                        <DeleteIcon fontSize="small" />
                    Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

import React from 'react';
import './BlogCard.css'
import Favorite from '@material-ui/icons/Favorite';
import DeleteForever from '@material-ui/icons/DeleteForever';


export const BlogCard = ({title, description, liked, likePost, deletePost}) => {

    const heartFill = liked ? 'crimson' : 'black'

    return (
        <div className="post">
            <div className="postContent">
                <h2>{title}</h2>
                <p>{description}</p>
                <div>
                    <button onClick={likePost}>
                        <Favorite style={{fill: heartFill}}/>
                    </button>
                </div>
            </div>
            <button className="deleteBtn" onClick={deletePost}>
                <DeleteForever />
            </button>
        </div>
    );
}

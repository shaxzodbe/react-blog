import React from 'react';
import './BlogCard.css'
import Favorite from '@material-ui/icons/Favorite';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';


export const BlogCard = (
    {title, description, liked, likePost, deletePost, handleEditFormShow, handleSelectPost}) => {

    const showEditForm = () => {
        handleSelectPost()
        handleEditFormShow()
    }

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
            <div className="postControl">
                <button className="editBtn" onClick={showEditForm}>
                    <Edit/>
                </button>
                <button className="deleteBtn" onClick={deletePost}>
                    <DeleteForever/>
                </button>
            </div>
        </div>
    );
}

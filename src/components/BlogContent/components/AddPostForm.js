import React from 'react';
import './AddPostForm.css'
import Cancel from '@material-ui/icons/Cancel';

export const AddPostForm = ({handleAddFormHide}) => {
    return (
        <>
            <form action="" className="AddPostForm">
                <button className="hideBtn" onClick={handleAddFormHide} ><Cancel/></button>
                <h2>Создание поста</h2>
                <div>
                    <input type="text" className="AddFormInput" name="postTitle" placeholder="Заголовок поста"/>
                </div>
                <div>
                    <textarea name="postDescription" className="AddFormInput" placeholder="Описание"/>
                </div>
                <div>
                    <button onClick={handleAddFormHide} className="blackBtn" type="button">Добавить пост</button>
                </div>
            </form>
            <div className="overlay" onClick={handleAddFormHide}>

            </div>
        </>
    );
};

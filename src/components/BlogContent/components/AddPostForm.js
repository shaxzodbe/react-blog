import React from 'react';
import './AddPostForm.css'
import Cancel from '@material-ui/icons/Cancel';

export class AddPostForm extends React.Component {

    state = {
        postTitle: '',
        postDescription: ''
    }

    handlePostTitleChange = e => {
        this.setState({
            postTitle: e.target.value
        })
    }
    handlePostDescriptionChange = e => {
        this.setState({
            postDescription: e.target.value
        })
    }


    render() {
        const handleAddFormHide = this.props.handleAddFormHide
        return (
            <>
                <form action="" className="AddPostForm">
                    <button className="hideBtn" onClick={handleAddFormHide}><Cancel/></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input type="text" className="AddFormInput" name="postTitle" placeholder="Заголовок поста"
                               value={this.state.postTitle} onChange={this.handlePostTitleChange} />
                    </div>
                    <div>
                        <textarea name="postDescription" className="AddFormInput" placeholder="Описание"
                                  value={this.state.postDescription} onChange={this.handlePostDescriptionChange} />
                    </div>
                    <div>
                        <button onClick={handleAddFormHide} className="blackBtn" type="button">Добавить пост</button>
                    </div>
                </form>
                <div className="overlay" onClick={handleAddFormHide}>

                </div>
            </>
        );
    }
}

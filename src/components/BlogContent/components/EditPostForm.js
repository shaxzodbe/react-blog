import React from 'react';
import './EditPostForm.css'
import Cancel from '@material-ui/icons/Cancel';

export class EditPostForm extends React.Component {

    state = {
        postTitle: this.props.selectedPost.title,
        postDescription: this.props.selectedPost.description
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

    savePost = e => {
        e.preventDefault()
        const post = {
            id: this.props.selectedPost.id,
            title: this.state.postTitle,
            description: this.state.postDescription,
            liked: this.props.selectedPost.liked
        }
        this.props.editBlogPost(post);
        this.props.handleEditFormHide();
    }

    handleEscape = (e) => {
        if (e.key === 'Escape') {
            this.props.handleEditFormHide()
        }
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    render() {
        const handleEditFormHide = this.props.handleEditFormHide
        return (
            <>
                <form className="addPostForm" onSubmit={this.savePost}>
                    <button className="hideBtn" onClick={handleEditFormHide}><Cancel/></button>
                    <h2>Редактирование поста</h2>
                    <div>
                        <input type="text"
                               className="editFormInput"
                               name="postTitle"
                               placeholder="Заголовок поста"
                               value={this.state.postTitle}
                               onChange={this.handlePostTitleChange}
                               required
                        />
                    </div>
                    <div>
                        <textarea name="postDescription"
                                  className="editFormInput"
                                  placeholder="Описание"
                                  value={this.state.postDescription}
                                  onChange={this.handlePostDescriptionChange}
                                  required
                        />
                    </div>
                    <div>
                        <button type="submit" className="blackBtn">Сохранить</button>
                    </div>
                </form>
                <div className="overlay" onClick={handleEditFormHide}/>
            </>
        );
    }
}

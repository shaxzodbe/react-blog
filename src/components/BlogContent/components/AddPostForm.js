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
    handleEscape = (e) => {
        if (e.key === 'Escape') {
            this.props.handleAddFormHide()
        }
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('вы обновили состоянию')
    // }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    createPost = (e) => {
        e.preventDefault()
        const post = {
            title: this.state.postTitle,
            description: this.state.postDescription,
            liked: false
        }
        this.props.addNewBlogPost(post)
        this.props.handleAddFormHide()
    }

    render() {
        const handleAddFormHide = this.props.handleAddFormHide
        return (
            <>
                <form className="addPostForm" onSubmit={this.createPost}>
                    <button className="hideBtn" onClick={handleAddFormHide}><Cancel/></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input type="text"
                               className="addFormInput"
                               name="postTitle"
                               placeholder="Заголовок поста"
                               value={this.state.postTitle}
                               onChange={this.handlePostTitleChange}
                               required
                        />
                    </div>
                    <div>
                        <textarea name="postDescription"
                                  className="addFormInput"
                                  placeholder="Описание"
                                  value={this.state.postDescription}
                                  onChange={this.handlePostDescriptionChange}
                                  required
                        />
                    </div>
                    <div>
                        <button type="submit" className="blackBtn">Добавить пост</button>
                    </div>
                </form>
                <div className="overlay" onClick={handleAddFormHide}/>
            </>
        );
    }
}

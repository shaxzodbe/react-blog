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

    // componentDidMount() {
    //     console.log('вы изменили состоянию')
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('вы обновили состоянию')
    // }
    //
    // componentWillUnmount() {
    //     console.log('вы удалили состоянию')
    // }

    createPost = (e) => {
        e.preventDefault()
        const post = {
            id: this.props.blogArray.length + 1,
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
                <form className="AddPostForm" onSubmit={this.createPost}>
                    <button className="hideBtn" onClick={handleAddFormHide}><Cancel/></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input type="text"
                               className="AddFormInput"
                               name="postTitle"
                               placeholder="Заголовок поста"
                               value={this.state.postTitle}
                               onChange={this.handlePostTitleChange}
                               required
                        />
                    </div>
                    <div>
                        <textarea name="postDescription"
                                  className="AddFormInput"
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

import React, {Component} from 'react';
import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {AddPostForm} from "./components/AddPostForm";
import {EditPostForm} from "./components/EditPostForm";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

export class BlogContent extends Component {

    state = {
        showAddForm: false,
        showEditForm: false,
        blogArray: [],
        isPending: false,
        selectedPost: {}
    }

    fetchPosts = () => {
        axios.get(`https://61544bff2473940017efad71.mockapi.io/api/posts/posts/`)
            .then((response) => {
                // handle success
                this.setState({
                    blogArray: response.data,
                    isPending: false
                })
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    likePost = blogPost => {

        const temp = {...blogPost}
        temp.liked = !temp.liked


        axios.put(`https://61544bff2473940017efad71.mockapi.io/api/posts/posts/${blogPost.id}`, temp)
            .then((response) => {
                console.log('Пост изменён => ', response.data)
                this.fetchPosts()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addNewBlogPost = blogPost => {
        this.setState({
            isPending: true
        })
        axios.post('https://61544bff2473940017efad71.mockapi.io/api/posts/posts/', blogPost)
            .then((response) => {
                console.log('Пост создан =>', response.data)
                this.fetchPosts()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deletePost = blogPost => {

        if (window.confirm(`Delete ${blogPost.title} ?`)) {
            this.setState({
                isPending: true
            })

            axios.delete(`https://61544bff2473940017efad71.mockapi.io/api/posts/posts/${blogPost.id}`)
                .then((response) => {
                    console.log('Вы удалили =>', response.data)

                    this.fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    editBlogPost = updatedBlogPost => {
        this.setState({
            isPending: true
        })

        axios.put(`https://61544bff2473940017efad71.mockapi.io/api/posts/posts/${updatedBlogPost.id}`, updatedBlogPost)
            .then((response) => {
                console.log('Пост отредактирован =>', response.data)
                this.fetchPosts()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true
        })
    }
    handleAddFormHide = () => {
        this.setState({
            showAddForm: false
        })
    }
    handleEditFormShow = () => {
        this.setState({
            showEditForm: true
        })
    }
    handleEditFormHide = () => {
        this.setState({
            showEditForm: false
        })
    }
    handleSelectPost = (blogPost) => {
        this.setState({
            selectedPost: blogPost
        })
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        const blogPosts = this.state.blogArray.map((item, pos) => {
            return (
                <BlogCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    liked={item.liked}
                    likePost={() => this.likePost(item)}
                    deletePost={() => this.deletePost(item)}
                    handleEditFormShow={this.handleEditFormShow}
                    handleSelectPost={() => this.handleSelectPost(item)}
                />
            )
        })

        if (this.state.blogArray.length === 0)
            return <h1>Загружаю данные...</h1>

        const postsOpacity = this.state.isPending ? 0.5 : 1

        return (
            <div className="blogPage">
                {
                    this.state.showAddForm &&
                    <AddPostForm
                        blogArray={this.state.blogArray}
                        addNewBlogPost={this.addNewBlogPost}
                        handleAddFormHide={this.handleAddFormHide}
                    />
                }
                {
                    this.state.showEditForm &&
                    <EditPostForm
                        handleEditFormHide={this.handleEditFormHide}
                        selectedPost={this.state.selectedPost}
                        editBlogPost={this.editBlogPost}
                    />
                }
                <>
                    <h1>Blog Page</h1>
                    <div className="addNewPost">
                        <button
                            className="blackBtn"
                            onClick={this.handleAddFormShow}>Создать новый пост
                        </button>
                    </div>
                    <div className="posts" style={{opacity: postsOpacity}}>
                        {blogPosts}
                    </div>
                    {this.state.isPending && <CircularProgress className="preloader"/>}
                </>
            </div>
        )
    }
}



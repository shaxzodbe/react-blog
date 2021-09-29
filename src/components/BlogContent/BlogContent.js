import React, {Component} from 'react';
import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {AddPostForm} from "./components/AddPostForm";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

export class BlogContent extends Component {

    state = {
        showAddForm: false,
        blogArray: [],
        isPending: false
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

            // this.setState((state) => {
            //     const temp = [...state.blogArray]
            //     temp.splice(pos, 1)
            //
            //     localStorage.setItem('blogPosts', JSON.stringify(temp))
            //
            //     return {
            //         blogArray: temp
            //     }
            // })
        }
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

    handleEscape = (e) => {
        if (e.key === 'Escape' && this.state.showAddForm) {
            this.handleAddFormHide()
        }
    }

    componentDidMount() {
        this.fetchPosts()
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
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
                    deletePost={() => this.deletePost(item)}/>
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
                    {this.state.isPending && <CircularProgress className="preloader" /> }
                </>
            </div>
        )
    }
}



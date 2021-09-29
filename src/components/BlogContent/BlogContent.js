import React, {Component} from 'react';
import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {AddPostForm} from "./components/AddPostForm";
import axios from "axios";

export class BlogContent extends Component {

    state = {
        showAddForm: false,
        blogArray: [],
        isPending: false
    }

    fetchPosts = () => {
        this.setState({
            isPending: true
        })
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

    likePost = pos => {
        const temp = [...this.state.blogArray];
        temp[pos].liked = !temp[pos].liked

        this.setState({
            blogArray: temp
        })
        localStorage.setItem('blogPosts', JSON.stringify(temp))

        // this.setState((state) => {
        //     const temp = [...state.blogArray];
        //     temp[pos].liked = !temp[pos].liked
        //
        //     localStorage.setItem('blogPosts', JSON.stringify(temp))
        //
        //     return {
        //         blogArray: temp
        //     }
        // })
    }

    deletePost = blogPost => {
        if (window.confirm(`Delete ${blogPost.title} ?`)) {

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

    addNewBlogPost = (blogPost) => {

        this.setState((state) => {
            const posts = [...state.blogArray]
            posts.push(blogPost)
            localStorage.setItem('blogPosts', JSON.stringify(posts))

            return {
                blogArray: posts
            }
        })
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
                    likePost={() => this.likePost(pos)}
                    deletePost={() => this.deletePost(item)}/>
            )
        })

        if (this.state.blogArray.length === 0)
            return <h1>Загружаю данные...</h1>

        return (
            <>
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
                    {
                        this.state.isPending && <h2>Подождите...</h2>
                    }
                    <div className="posts"> {blogPosts} </div>
                </>
            </>
        )
    }
}



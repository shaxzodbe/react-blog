import React, {Component} from 'react';
import './BlogContent.css'
import {posts} from "../../shared/ProjectData";
import {BlogCard} from "./components/BlogCard";
import {AddPostForm} from "./components/AddPostForm";

export class BlogContent extends Component {

    state = {
        showAddForm: false,
        blogArray: JSON.parse(localStorage.getItem('blogPosts')) || posts
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

    deletePost = pos => {
        if (window.confirm(`Delete ${this.state.blogArray[pos].title} ?`)) {

            this.setState((state) => {
                const temp = [...state.blogArray]
                temp.splice(pos, 1)

                localStorage.setItem('blogPosts', JSON.stringify(temp))

                return {
                    blogArray: temp
                }
            })
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
        axios
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
                    deletePost={() => this.deletePost(pos)}/>
            )
        })

        return (
            <>
                {
                    this.state.showAddForm ?
                        <AddPostForm
                            blogArray={this.state.blogArray}
                            addNewBlogPost={this.addNewBlogPost}
                            handleAddFormHide={this.handleAddFormHide}
                        /> : null
                }

                <>
                    <h1>Blog Page</h1>
                    <div className="addNewPost">
                        <button
                            className="blackBtn"
                            onClick={this.handleAddFormShow}>Создать новый пост
                        </button>
                    </div>
                    <div className="posts"> {blogPosts} </div>
                </>
            </>
        )
    }
}



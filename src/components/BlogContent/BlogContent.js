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
    }

    deletePost = pos => {
        if (window.confirm(`Delete ${this.state.blogArray[pos].title} ?`)) {
            const temp = [...this.state.blogArray]
            temp.splice(pos, 1)

            console.log('Default array =>', this.state.blogArray)
            console.log('Changed array =>', temp)

            this.setState({
                blogArray: temp
            })
            localStorage.setItem('blogPosts', JSON.stringify(temp))
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
                    this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null
                }

                <>
                    <h1>Simple Blog</h1>
                    <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
                    <div className="posts"> {blogPosts} </div>
                </>
            </>
        )
    }
}



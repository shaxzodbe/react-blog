import React, {Component} from 'react';
import './BlogContent.css'
import {posts} from "../../shared/ProjectData";
import {BlogCard} from "./components/BlogCard";

export class BlogContent extends Component {

    state = {
        showBlog: true,
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

    toggleBlog = () => {
        this.setState(({showBlog}) => {
            return {
                showBlog: !showBlog
            }
        })
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
                <button onClick={(this.toggleBlog)}>
                    {this.state.showBlog ? 'Hide blog' : 'Show blog'}
                </button>
                {this.state.showBlog ?
                    <>
                        <h1>Simple Blog</h1>
                        <div className="posts"> {blogPosts} </div>
                    </>
                    : null
                }
            </>
        )
    }
}



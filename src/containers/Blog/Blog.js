import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    };

    componentDidMount = async()=>{
      let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const posts = response.data.slice(0,4);
      const updatedPosts = posts.map(post=>{
         return {
             ...post,
             author: 'Max'
         }
      });
      this.setState({posts: updatedPosts});
      console.log("Response: ", posts);
    };

    postSelectedHandler = (id) =>{
      this.setState({selectedPostId: id});
    };

    render () {

        const postArrays = this.state.posts.map(post =>{
                return <Post
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
            });

        return (
            <div>
                <section className="Posts">
                    {postArrays}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
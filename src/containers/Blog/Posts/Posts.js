import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component{

    state = {
        posts: [],
        error: null
    };

    componentDidMount = async()=>{
        console.log("[Posts.js] componentDidMount");
        try{
            let response = await axios.get('/posts');
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return {
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({posts: updatedPosts});
            console.log("Response: ", posts);
        }
        catch(error){
            console.log("Error while fetching data ", error);
         //   this.setState({error: true});
        }
    };

    postSelectedHandler = (id) =>{
        //this.setState({selectedPostId: id});
        this.props.history.push('/posts/'+id);
    };

    render(){
        console.log("Rendering posts");
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map( post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler( post.id )} />
                    // </Link>
                );
            } );
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;
import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'; 
import { newPost } from '../actions/actions';



class PostPage extends Component {
    static propTypes = {
    }

    state = {
        post : {
            id: Math.floor((Math.random() * 1000000) + 1),
            timestamp: Date.now(),
            title: '',
            body: '',
            author:'',
            category:'',
            voteScore: 1,
            deleted: false
        }
    
    }
   
    
    updateTitle = (title) =>{
        let post = {...this.state.post};
        post.title = title;
        this.setState({post})
    }

    updateAuthor = (author) =>{
        let post = {...this.state.post}
        post.author = author;
        this.setState({post})
    }

    updateCategory = (category) =>{
        let post = {...this.state.post}
        post.category = category;
        this.setState({post})
    }

    updateContent = (body) =>{
        let post = {...this.state.post}
        post.body = body;
        this.setState({post})
    }

    
    onSubmit = (event) => {
        event.preventDefault();
        let post = {...this.state.post}
        post = JSON.stringify(post);
        this.props.newPost(post)
        this.props.history.push('/')
    }

  
    render() {
        return (
            <div className="uk-container">
                <div className="uk-width-3-5@m uk-align-center uk-card-default uk-padding">
                <h2 className="uk-text-center">Post it like it's Hot</h2>
                <form >
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <label className="uk-label">Post Title</label>
                            <input className="uk-input" type="text" placeholder="Title" id="title"  onChange={(event) => this.updateTitle(event.target.value)}/>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-label">Author</label>
                            <input className="uk-input" type="text" placeholder="Author" id="author"  onChange={(event) => this.updateAuthor(event.target.value)}/>
                        </div>
                        <div className="uk-margin">
                        <label className="uk-label">category</label>
                            <select className="uk-select" id="category"  onChange={(event) => this.updateCategory(event.target.value)}>
                            <option selected="true" value="none" disabled="true">Select a category</option>
                                <option value="react">React</option>
                                <option value="redux">Redux</option>
                                <option value="vue.js">Vue.js</option>
                                <option value="node.js">Node.js</option>
                                <option value="CSharp">C#</option>
                                <option value="CPlusPlus">C++</option>
                                <option value="javascript">Javascript</option>
                            </select>
                        </div>
                        <div className="uk-margin">
                        <label className="uk-label">Content</label>
                            <textarea className="uk-textarea" rows="5" placeholder="Content" id="postbody"  onChange={(event) => this.updateContent(event.target.value)}></textarea>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-button uk-button-primary uk-align-center" type="button" value="POST"
                            onClick={this.onSubmit} />
                        </div>
                    </fieldset>
                </form>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    newPost: (post) => dispatch(newPost(post))
});
  
const mapStateToProps = state => ({
    posts: state.allPosts.posts
})

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(PostPage)));
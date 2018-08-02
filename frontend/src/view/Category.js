import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getAllPosts, deletePost, voteOnPost, updateCategory, sortBy, getAllComments } from '../actions/actions';
import EditPost from '../view/EditPost';

const categories = ["react","redux","vue.js","node.js","CSharp","CPlusPlus","javascript"];

class Category extends Component {
    static propTypes = {
    }

    state = {
        posts: [],
    }


    componentWillMount() {
        
            this.props.updateCategory(this.props.match.params.category)
    }

    sortBy = (type) => {
        this.props.sortBy(type);
    }

    deletePost = (postId) => {
        this.props.deletePost(postId);
    }

    onVote = (postId, vote) => {
        console.log(postId)
        if (vote) {
            this.props.voteOnPost(postId, 'upVote')
        }
        if (!vote) {
            this.props.voteOnPost(postId, 'downVote')
        }
    }

    updateCatagory = (category) => {
        console.log(category)
        if (category !== '') {
            this.props.updateCategory(category);
            this.props.history.push(`/${category}`)
        }
        else if(category === '') {
            this.props.getAllPosts();
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="uk-container">
                {categories.indexOf(this.props.match.params.category) > -1 ? <div>
                    <h3 className=" uk-padding-small uk-padding-remove-bottom uk-margin-remove-bottom">Filter Posts:</h3>
                    <nav data-uk-navbar>
                        <div className="uk-inline uk-padding-small">

                            <select className="uk-select" onChange={e => this.sortBy(e.target.value)}>
                                <option selected="true" disabled="true">Sort by</option>
                                <option value="voteScore">Popularity</option>
                                <option value="timestamp">Recent</option>
                            </select>

                        </div>
                        <div className="uk-inline  uk-padding-small">
                            <select className="uk-select" onChange={e => this.updateCatagory(e.target.value)}>
                                <option selected="true" disabled="true">{this.props.match.params.category}</option>
                                <option value="">All posts</option>
                                <option value="react">React</option>
                                <option value="redux">Redux</option>
                                <option value="vue.js">Vue.js</option>
                                <option value="node.js">Node.js</option>
                                <option value="CSharp">C#</option>
                                <option value="CPlusPlus">C++</option>
                                <option value="javascript">Javascript</option>
                            </select>

                        </div>
                    </nav>
                    <ul className="uk-padding-small">
                    {this.props.posts.length === 0 ? 'No Posts in This Category' : null}
                        {this.props.posts.map((post, index) => (
                            <div key={index}>
                                <article className="uk-article uk-card-default uk-margin-bottom uk-width-2-3@m uk-align-center">
                                    <div className="uk-padding-small">
                                        <div className="uk-flex uk-flex-between">
                                            <div><button className="uk-button  uk-button-primary" data-uk-toggle={'target:#Edit' + post.id} type="button">Edit Post</button>
                                                <EditPost post={post} />
                                            </div>

                                            <div><button className="uk-button uk-button-default"
                                                onClick={() => this.deletePost(post.id)}>
                                                Delete Post
                                            </button>
                                            </div>
                                        </div>
                                        <div className="uk-margin-top">
                                            <h1 className="uk-article-title uk-text-center uk-margin-remove-bottom"><Link className="uk-link-reset" to={`/${post.category}/${post.id}`} data-uk-tooltip="View Post & All Comments">{post.title}</Link></h1>



                                            <p className="uk-article-meta uk-text-center uk-margin-small-top">Written by {post.author} | Posted in {post.category} | {post.timestamp}</p>

                                            <p className="uk-text-lead uk-width-4-5@m uk-align-center">{post.body}</p>
                                            <p className="uk-width-4-5@m uk-align-center">{post.commentCount === 0 ? 'No' : post.commentCount} {post.commentCount > 1 ? 'Comments' : 'Comment'}</p>
                                            <p className="uk-text-bold uk-width-4-5@m uk-align-center uk-text-right"><button className="uk-button uk-button-secondary uk-text-large uk-button-small" onClick={() => this.onVote(post.id, true)}>+</button>  <button className="uk-button uk-button-default uk-text-large uk-button-small" onClick={() => this.onVote(post.id, false)}>-</button> {post.voteScore} {post.voteScore === 1 ? 'Like' : 'Likes'}</p>
                                        </div>

                                    </div>
                                </article>
                            </div>
                        ))}
                    </ul>
                </div> :
            <div><h5 className="uk-text-center">404 &mdash; page not found<br/>This category does not exist, please proceed to <Link to="/">Homepage</Link></h5></div>}
                
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    getAllPosts: () => dispatch(getAllPosts()),
    deletePost: (postId) => dispatch(deletePost(postId)),
    voteOnPost: (postId, vote) => dispatch(voteOnPost(postId, vote)),
    updateCategory: (category) => dispatch(updateCategory(category)),
    sortBy: (sortby) => dispatch(sortBy(sortby)),
    getAllComments: (postId) => dispatch(getAllComments(postId)),
});

const mapStateToProps = state => ({
    posts: state.allPosts.posts,
    comments: state.allPosts.comments
})

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Category)));
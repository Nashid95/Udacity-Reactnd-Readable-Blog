import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getAllPosts, deletePost, voteOnPost, updateCategory, sortBy, getAllComments } from '../actions/actions';
import EditPost from '../view/EditPost';




class HomePage extends Component {
    static propTypes = {
    }

    state = {
        posts: [],
        category: ''
    }

    componentWillMount() {
        this.props.getAllPosts()
    }


    updateDisplayedPosts = () => {
        setTimeout(() => {
            const posts = [...this.props.posts]
            this.setState({ displayedPosts: posts })
        }, 200)
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
        else
            this.props.getAllPosts();
    }

    getComments = (postId) => {
        this.props.getAllComments(postId)
    }



    render() {
        return (
            <div className="uk-container">
                <div>
                    <h3 className=" uk-padding-small uk-padding-remove-bottom uk-margin-remove-bottom">Filter Posts:</h3>
                    <nav data-uk-navbar>
                        <div className="uk-inline uk-padding-small">
                            <select className="uk-select" onChange={e => this.sortBy(e.target.value)}>
                                <option selected="true" defaultValue="none" disabled="true">Sort by</option>
                                <option value="voteScore">Popularity</option>
                                <option value="timestamp">Recent</option>
                            </select>
                        </div>
                        <div className="uk-inline  uk-padding-small">
                            <select className="uk-select" onChange={e => this.updateCatagory(e.target.value)}>
                                <option selected="true" defaultValue="none" disabled="true">Select Category</option>
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
                </div>
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

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(HomePage)));
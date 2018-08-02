import React, { Component } from 'react'
import { withRouter, match } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getCurrentPost, deletePost, deleteComment, voteOnPost, voteOnComment, newComment, getAllComments, editPost } from '../actions/actions';
import { connect } from 'react-redux';
import EditComment from '../view/EditComment';


class Post extends Component {
    state = {
        post: {
            title: this.props.currentPost.title,
            body: this.props.currentPost.body,
        },
        comment: {
            id: Math.floor((Math.random() * 1000000) + 1),
            timestamp: Date.now(),
            body: '',
            author: '',
            parentId: this.props.match.params.postId

        }

    }

    componentWillMount() {
        window.scrollTo(0, 0)
        this.props.getCurrentPost(this.props.match.params.postId);
        this.props.getAllComments(this.props.match.params.postId);
    }

    updateTitle = (title) =>{
        let post = {...this.state.post};
        post.title = title;
        this.setState({post})
    }

    updateContent = (body) =>{
        let post = {...this.state.post}
        post.body = body;
        this.setState({post})
    }

    
    onSubmitEdit = (event) => {
        event.preventDefault();
        let post = {...this.props.currentPost}
        this.props.editPost(post.id, this.state.post.title, this.state.post.body)
        window.scrollTo(0, 0)
    }

    updateCommentAuthor = (author) => {
        let comment = { ...this.state.comment };
        comment.author = author;
        this.setState({ comment })
    }

    updateCommentContent = (body) => {
        let comment = { ...this.state.comment }
        comment.body = body;
        this.setState({ comment })
    }

    deletePost = (postId) => {
        this.props.deletePost(postId);
        this.props.history.push('/')
    }

    deleteComment = (commentId) => {
        this.props.deleteComment(commentId);

    }

    onVote = (postId, vote) => {
        if (vote) {
            this.props.voteOnPost(postId, 'upVote')
        }
        if (!vote) {
            this.props.voteOnPost(postId, 'downVote')
        }
    }

    onCommentVote = (commentId, vote) => {
        if (vote) {
            this.props.voteOnComment(commentId, 'upVote')
        }
        if (!vote) {
            this.props.voteOnComment(commentId, 'downVote')
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        let comment = { ...this.state.comment }
        comment = JSON.stringify(comment);
        this.props.newComment(comment)
         
    }


    render() {
        return (
            <div className="uk-container">
                {!this.props.currentPost.id ? <div><h5 className="uk-text-center">404 &mdash; page not found<br/>This post has been deleted, please proceed to <Link to="/">Homepage</Link></h5></div> : 
            <div><article className="uk-article uk-card-default uk-margin-bottom uk-width-2-3@m uk-align-center">
            <div className="uk-padding-small">
                <div className="uk-flex uk-flex-between">
                    <div><a className="uk-button  uk-button-primary" href="#Editpost" type="button" data-uk-scroll>Edit Post</a>
                        
                    </div>

                    <div><button className="uk-button uk-button-default"
                        onClick={() => this.deletePost(this.props.currentPost.id)}>
                        Delete Post
                    </button>
                    </div>
                </div>
                <div className="uk-margin-top">
                    <h1 className="uk-article-title uk-text-center uk-margin-remove-bottom">{this.props.currentPost.title}</h1>
                    <p className="uk-article-meta uk-text-center uk-margin-small-top">Written by {this.props.currentPost.author} | Posted in {this.props.currentPost.category} | {this.props.currentPost.timestamp}</p>

                    <p className="uk-text-lead uk-width-4-5@m uk-align-center">{this.props.currentPost.body}</p>
                    <p className="uk-text-bold uk-width-4-5@m uk-align-center uk-text-right"><button className="uk-button uk-button-secondary uk-text-large uk-button-small" onClick={() => this.onVote(this.props.currentPost.id, true)}>+</button>  <button className="uk-button uk-button-default uk-text-large uk-button-small" onClick={() => this.onVote(this.props.currentPost.id, false)}>-</button> {this.props.currentPost.voteScore} {this.props.currentPost.voteScore === 1 ? 'Like' : 'Likes'}</p>
                </div>
                <h4 className="uk-margin-small-bottom">{this.props.comments.length === 0 ? 'No' : this.props.comments.length} {this.props.comments.length > 1 ? 'Comments' : 'Comment'}</h4>
                <hr className="uk-margin-remove-top" />
                {this.props.comments.map((comment, index) => (
                    <div key={index}>
                        <article className="uk-comment uk-comment-primary mb-3 uk-width-2-3@m uk-align-center">
                            <button className="uk-button uk-button-text"
                                onClick={() => this.deleteComment(comment.id)}>
                                Delete Comment
                            </button>
                            <button className="uk-button  uk-button-text uk-align-right uk-margin-remove-bottom" data-uk-toggle={'target:#EditComment' + comment.id} type="button">Edit Comment</button>
                                    <EditComment comment={comment}/>
                                    
                                    <hr/>
                            <h4 className="uk-comment-title uk-margin-remove uk-text-center uk-margin-top">Commented by {comment.author}</h4>
                            <p className="uk-text-center uk-text-muted uk-margin-remove-top">At {comment.timestamp}</p>

                            <div className="uk-comment-body">
                                <p>{comment.body}</p>
                                <p className="uk-text-bold uk-width-4-5@m uk-align-center uk-text-right"><button className="uk-button uk-button-secondary uk-text-large uk-button-small" onClick={() => this.onCommentVote(comment.id, true)}>+</button>  <button className="uk-button uk-button-default uk-text-large uk-button-small" onClick={() => this.onCommentVote(comment.id, false)}>-</button> {comment.voteScore} {comment.voteScore === 1 ? 'Like' : 'Likes'}</p>
                            </div>
                        </article>
                        <hr />
                    </div>

                ))
                }

            </div>
            <form >
                <fieldset className="uk-fieldset">
                    <div className="uk-margin uk-width-2-3@s uk-align-center">
                        <label className="uk-label">Author</label>
                        <input className="uk-input" type="text" placeholder="Title" id="title" onChange={(event) => this.updateCommentAuthor(event.target.value)} />
                    </div>
                    <div className="uk-margin uk-width-2-3@s uk-align-center">
                        <label className="uk-label">Comment</label>
                        <textarea className="uk-textarea" rows="5" placeholder="Content" id="postbody" onChange={(event) => this.updateCommentContent(event.target.value)}></textarea>
                    </div>
                    <div className="uk-margin">
                        <input className="uk-button uk-button-primary uk-align-center uk-modal-close" type="button" value="Comment"
                            onClick={this.onSubmit} />
                    </div>
                </fieldset>
            </form>

        </article>
       
            <div id="Editpost" className="uk-margin uk-width-1-2@s uk-align-center uk-background-muted uk-padding">
            <h2 className="uk-text-center">Edit This Post</h2>
            <form >
                <fieldset className="uk-fieldset">
                    <div className="uk-margin">
                        <label className="uk-label">Post Title</label>
                        <input className="uk-input" type="text" placeholder="Title" id="title"  onChange={(event) => this.updateTitle(event.target.value)}/>
                    </div>
                    <div className="uk-margin">
                    <label className="uk-label">Content</label>
                        <textarea className="uk-textarea" rows="5" placeholder="Content" id="postbody"   onChange={(event) => this.updateContent(event.target.value)}></textarea>
                    </div>
                    <div className="uk-margin">
                        <input className="uk-button uk-button-primary uk-align-center uk-modal-close" type="button" value="Apply Changes"
                        onClick={this.onSubmitEdit} />
                    </div>
                </fieldset>
            </form>             
            </div>
            </div>}
                
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentPost: (postId) => dispatch(getCurrentPost(postId)),
    getAllComments: (postId) => dispatch(getAllComments(postId)),
    newComment: (comment) => dispatch(newComment(comment)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    voteOnPost: (postId, vote) => dispatch(voteOnPost(postId, vote)),
    voteOnComment: (commentId, vote) => dispatch(voteOnComment(commentId, vote)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body))
});

const mapStateToProps = state => ({
    currentPost: state.allPosts.currentPost,
    comments: state.allPosts.comments
})

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Post)));
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'; 
import { editPost } from '../actions/actions';



class EditPost extends Component {
    static propTypes = {
        post : PropTypes.object.isRequired
    };

    state = {
        post : {
            title: this.props.post.title,
            body: this.props.post.body
        }
    }
    
        
    componentDidMount(){ 
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

    
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.post)
        let post = {...this.props.post}
        this.props.editPost(post.id, this.state.post.title, this.state.post.body)
        
    }

  
    render() {
        return (
            <div id={'Edit' + this.props.post.id} data-uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-text-center">Edit Dem Post</h2>
                <form >
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <label className="uk-label">Post Title</label>
                            <input className="uk-input" type="text" placeholder="Title" id="title" defaultValue={this.state.post.title}  onChange={(event) => this.updateTitle(event.target.value)}/>
                        </div>
                        <div className="uk-margin">
                        <label className="uk-label">Content</label>
                            <textarea className="uk-textarea" rows="5" placeholder="Content" id="postbody" defaultValue={this.state.post.body}  onChange={(event) => this.updateContent(event.target.value)}></textarea>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-button uk-button-primary uk-align-center uk-modal-close" type="button" value="Apply"
                            onClick={this.onSubmit}/>
                        </div>
                    </fieldset>
                </form>             
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    editPost: (id, title, body) => dispatch(editPost(id, title, body))
});
  
const mapStateToProps = state => ({
    posts: state.allPosts.posts
})

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(EditPost)));
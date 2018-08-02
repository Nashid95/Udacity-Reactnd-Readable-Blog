import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'; 
import { editComment } from '../actions/actions';



class EditComment extends Component {
    static propTypes = {
        comment : PropTypes.object.isRequired
    };

    state = {
        comment : {
            timestamp: Date.now(),
            body: this.props.comment.body
        }
    }
    
        
    componentDidMount(){ 
    }
   

    updateCommentContent = (body) => {
        let comment = { ...this.state.comment }
        comment.body = body;
        this.setState({ comment })
    }

    
    onSubmit = (event) => {
        event.preventDefault();
        let comment = {...this.props.comment}
        this.props.editComment(comment.id, this.state.comment.timestamp, this.state.comment.body)
        
    }

  
    render() {
        return (
            <div id={'EditComment' + this.props.comment.id} data-uk-modal>
                <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-text-center">Edit Dem Comment</h2>
                <form >
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                        <label className="uk-label">Comment</label>
                            <textarea className="uk-textarea" rows="5" placeholder="Comment" id="commentbody" defaultValue={this.state.comment.body}  onChange={(event) => this.updateCommentContent(event.target.value)}></textarea>
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
    editComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body))
});
  
const mapStateToProps = state => ({
    posts: state.allPosts.posts
})

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(EditComment)));
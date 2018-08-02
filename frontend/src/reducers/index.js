import { combineReducers } from 'redux'

import { GET_POSTS_SUCCESS, GET_COMMENTS_SUCCESS, NEW_POST_SUCCESS, NEW_COMMENT_SUCCESS, DELETE_POST_SUCCESS, DELETE_COMMENT_SUCCESS, VOTE_POST_SUCCESS, VOTE_COMMENT_SUCCESS, EDIT_POST_SUCCESS, EDIT_COMMENT_SUCCESS, GET_CURRENT_POST_SUCCESS, GET_CATEGORY_SUCCESS, SORT_BY_SUCCESS } from '../actions/actions.js'

export const intitalAppState = {
  posts: [],
  comments: [],
  currentPost: {}
}

function allPosts(state = intitalAppState, action){
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        posts:action.posts,
        comments: [...state.comments]
        ,currentPost: {...state.currentPost}
      };
    case GET_COMMENTS_SUCCESS:
    return {
      posts: [...state.posts],
      comments: action.comments,
      currentPost: {...state.currentPost}
    };
    case GET_CURRENT_POST_SUCCESS:
      const newPost = action.post
      newPost.commentCount = 0
      return {
        posts: [...state.posts],
        comments: [...state.comments],
        currentPost:{...newPost}
      };
    case NEW_POST_SUCCESS:
      return {
        posts: [...state.posts, action.post],
        comments: [...state.comments],
        currentPost: {...state.currentPost}
      };
    case NEW_COMMENT_SUCCESS:
      return {
        posts: [...state.posts],
        comments: [...state.comments, action.comment],
        currentPost: {...state.currentPost}
      };
    case DELETE_POST_SUCCESS:
      return {
        posts: [...state.posts.filter(post => post.id !== action.postId)],
        comments: [...state.comments],
        currentPost: {...state.currentPost}
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        posts: [...state.posts],
        comments: [...state.comments.filter(comment => comment.id !== action.commentId)],
        currentPost: {...state.currentPost}
      };
    case VOTE_POST_SUCCESS:
    let posts = [...state.posts]
    let onePost = {...state.currentPost}
        posts.map(post => {
          if(post.id === action.postId){
            if(action.vote === 'upVote') {
              post.voteScore++
              return post;
            }
            else if(action.vote === 'downVote') {
              post.voteScore--
              return post;
            }
          } 
          else {
            return post;
          }  
      });
      if(onePost.id === action.postId){
        if(action.vote === 'upVote') {
          onePost.voteScore++
        }
        else if(action.vote === 'downVote') {
          onePost.voteScore--
        }
      } 
      return {
        posts: [...posts],
        comments: [...state.comments],
        currentPost: {...onePost}
      };
    case VOTE_COMMENT_SUCCESS:
      let comments = [...state.comments]
          comments.map(comment => {
            if(comment.id === action.commentId){
              if(action.vote === 'upVote') {
                comment.voteScore++
                return comment;
              }
              else if(action.vote === 'downVote') {
                comment.voteScore--
                return comment;
              }
            } 
            else {
              return comment;
            }  
        });
        return {
          posts: [...state.posts],
          comments: [...comments],
          currentPost: {...state.currentPost}
        };
    case EDIT_POST_SUCCESS:
      let editOnePost = {...state.currentPost}
      let newPosts = [...state.posts.map(post => {
        if(post.id === action.post.id){
          return action.post
        } else {
          return post;
        }
      })]

      if(editOnePost.id === action.post.id){
        editOnePost = action.post;
      }
      return {
        posts: [...newPosts],
        comments: [...state.comments],
        currentPost: {...editOnePost}
      };
    case EDIT_COMMENT_SUCCESS:
      let newComments = [...state.comments.map(comment => {
        if(comment.id === action.comment.id){
          return action.comment
        } else {
          return comment;
        }
      })]
      return {
        posts: [...state.posts],
        comments: [...newComments],
        currentPost: {...state.currentPost}
      };
    case GET_CATEGORY_SUCCESS:
      return {
        posts: action.category,
        comments: [...state.comments],
        currentPost: {...state.currentPost}
      };
    case SORT_BY_SUCCESS:
       let sortedPosts = [...state.posts]
      if(action.sortby === 'voteScore')
          sortedPosts.sort(function(a,b){return b.voteScore - a.voteScore})
      if(action.sortby === 'timestamp')
          sortedPosts.sort(function(a,b){return b.timestamp - a.timestamp})
      return {
        posts: [...sortedPosts],
        comments: [...state.comments],
        currentPost: {...state.currentPost}
      };
    default:
      return state;
  }
}

export default combineReducers({
  allPosts
})

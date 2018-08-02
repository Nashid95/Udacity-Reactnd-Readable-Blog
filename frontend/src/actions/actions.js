import * as api from '../utils/api';

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
export const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const GET_CURRENT_POST_SUCCESS = 'GET_CURRENT_POST_SUCCESS';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const SORT_BY_SUCCESS = 'SORT_BY_SUCCESS';

export const getAllPosts = () => dispatch => {
  api.getAllPosts().then(posts =>
  dispatch({
    type:'GET_POSTS_SUCCESS',
    posts
  }))
}

export const getAllComments = (postId) => dispatch => {
  api.getAllComments(postId).then(comments =>
  dispatch({
    type:'GET_COMMENTS_SUCCESS',
    comments
  }))
}

export const getCurrentPost = (postId) => dispatch => {
  api.getCurrentPost(postId).then(post =>
    dispatch({
      type:'GET_CURRENT_POST_SUCCESS',
      post
    })).catch(err => console.log(err))
  }

export const newPost = (post) => dispatch => {
  api.post(post).then(post =>
  dispatch({
    type:'NEW_POST_SUCCESS',
    post
  })).catch(err => console.log(err))
}

export const newComment = (comment) => dispatch => {
  api.comment(comment).then(comment =>
  dispatch({
    type:'NEW_COMMENT_SUCCESS',
    comment
  })).catch(err => console.log(err))
}

export const deletePost = (postId) => dispatch => {
  api.deletePost(postId).then(postId =>
  dispatch({
    type:'DELETE_POST_SUCCESS',
    postId
  })).catch(err => console.log(err))
}

export const deleteComment = (commentId) => dispatch => {
  api.deletePost(commentId).then(commentId =>
  dispatch({
    type:'DELETE_COMMENT_SUCCESS',
    commentId
  })).catch(err => console.log(err))
}

export const voteOnPost = (postId, vote) => dispatch => {
  api.voteOnPost(postId, vote).then(postId =>
  dispatch({
    type:'VOTE_POST_SUCCESS',
    postId,
    vote
  })).catch(err => console.log(err))
}

export const voteOnComment = (commentId, vote) => dispatch => {
  api.voteOnComment(commentId, vote).then(commentId =>
  dispatch({
    type:'VOTE_COMMENT_SUCCESS',
    commentId,
    vote
  })).catch(err => console.log(err))
}

export const editPost = (id, title, body) => dispatch => {
  api.editPost(id, title, body).then(post =>
  dispatch({
    type:'EDIT_POST_SUCCESS',
    post
  })).catch(err => console.log(err))
}

export const editComment = (id, timestamp, body) => dispatch => {
  api.editComment(id, timestamp, body).then(comment =>
  dispatch({
    type:'EDIT_COMMENT_SUCCESS',
    comment
  })).catch(err => console.log(err))
}

export const updateCategory = (category) => dispatch => {
  api.updateCategory(category).then(category =>
  dispatch({
    type:'GET_CATEGORY_SUCCESS',
    category
  }))
}

export const sortBy = (sortby) => dispatch => {
  dispatch({
    type:'SORT_BY_SUCCESS',
    sortby
  })
}
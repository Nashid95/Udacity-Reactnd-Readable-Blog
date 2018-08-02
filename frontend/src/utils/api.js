const api = "http://localhost:3001"

const token = "donuts"

const headers = {
  'Authorization': token,
  'Accept': 'application/json',
  'Content-Type': 'application/json',

}

export function getAllPosts() {
  return (
    fetch(`${api}/posts`, { headers })
      .then(res => res.json()
      ).catch(err =>
        console.error(err)
      ))
};

export function getAllComments(postId) {
  return (
    fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json()
      ).catch(err =>
        console.error(err)
      ))
};

export function getCurrentPost(postId) {
  return (
    fetch(`${api}/posts/${postId}`, { headers })
      .then(res => res.json()
      ).catch(err =>
        console.error(err)
      ))
};

export function post(post) {
  return (
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: post
    }).then(res => res.json()).catch(err =>
      console.error(err)
    ))
};

export function comment(comment) {
  return (
    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: comment
    }).then(res => res.json()).catch(err =>
      console.error(err)
    ))
};

export function deleteComment(commentId) {
  return (
    fetch(`${api}/comments/${commentId}`, {
      method: 'DELETE',
      headers: headers
    }).then(res => commentId).catch(err =>
      console.error(err))
  )
};

export function deletePost(postId) {
  return (
    fetch(`${api}/posts/${postId}`, {
      method: 'DELETE',
      headers: headers
    }).then(res => postId).catch(err =>
      console.error(err))
  )
};

export function voteOnPost(postId, thumbsUp) {
  return (
    fetch(`${api}/posts/${postId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ option: thumbsUp })
    }).then(res => postId, thumbsUp).catch(err =>
      console.error(err))
  )
}

export function voteOnComment(commentId, thumbsUp) {
  return (
    fetch(`${api}/comments/${commentId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ option: thumbsUp })
    }).then(res => commentId, thumbsUp).catch(err =>
      console.error(err))
  )
}

export function editPost(postId, title, body) {
  return (
    fetch(`${api}/posts/${postId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ title: title, body: body })
    }).then(res => res.json()).catch(err =>
      console.error(err)
    ))
};

export function editComment(commentId, timestamp, body) {
  return (
    fetch(`${api}/comments/${commentId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ timestamp: timestamp, body: body })
    }).then(res => res.json()).catch(err =>
      console.error(err)
    ))
};

export function updateCategory(category) {
  return (
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json()
    ).catch(err =>
      console.error(err)
    ))
};
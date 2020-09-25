function getUser(user_id, callback){
  fetch(`http://localhost:8000/users/${user_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllUsers(callback){
  fetch('http://localhost:8000/users/all')
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
function getPost(post_id, callback){
  fetch(`http://localhost:8000/post/${post_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllPosts(callback){
  fetch('http://localhost:8000/posts/all')
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
function loginUser(username, password, callback){
  fetch('http://localhost:8000/accounts/login/', {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
function registerUser(username, firstname, lastname, userType, password, email, conf_password, callback){
  fetch('http://localhost:8000/accounts/register/', {
    method: "POST",
    body: JSON.stringify({
      username: username,
      first_name: firstname,
      last_name: lastname, 
      email: email,
      user_type: userType,
      password: password,
      conf_password: conf_password
    })
  })
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}


function createNewPost(user_id, postContent, imageUrl, callback){
  fetch('http://localhost:8000/posts/new', {
    method: "POST",
    body: JSON.stringify(
      {
        user_id: user_id,
        content: postContent,
        imageUrl: imageUrl
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function createNewProduct(user_id, name, description, price, imageUrl, callback){
  fetch('http://localhost:8000/posts/new', {
    method: "POST",
    body: JSON.stringify(
      {
        user_id: user_id,
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function editPost(user_id, post_id, operation, newText, callback){
  fetch(`http://localhost:8000/post/${post_id}/${operation}`,{
    method: "PUT", 
    body: JSON.stringify(
      {
        user_id: user_id,
        newText: newText,
        operation: operation,
        post_id: post_id
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
module.exports = {
  getUser,
  getAllUsers, 
  getPost, 
  getAllPosts, 
  loginUser, 
  registerUser, 
  createNewPost, 
  createNewProduct, 
  editPost
}
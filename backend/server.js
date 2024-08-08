const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// Initialize server
const app = express()
app.use(cors())
app.use(bodyParser.json())

let posts = [
  {"userId": 1,
    "postId": 1,
    "title": "This 1 blog post",
    "body": "This is awesome 1 blog post creation"
  },
  {"userId": 1,
    "postId": 2,
    "title": "This 2 blog post",
    "body": "This 2 creation"
  },
  {"userId": 2,
    "postId": 3,
    "title": "This something blog post",
    "body": "This some other user created"
  }
]

// create a new post
app.post('/posts', (req, res) => {
  const newPost = req.body
  posts.push(newPost)
  res.status(201).json(newPost)
})

// get all the created post
app.get('/posts', (req, res)=> {
  res.json(posts)
})

// get single post by id
app.get('/posts/:id', (req, res)=> {
    const id = parseInt(req.params.id)
    posts = posts.filter((post) => post.postId === id)
    res.json(posts)
})

// get all data based on the used id
app.get('/posts/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const userPosts = posts.filter((userData) => userData.userId === userId)
  if(userPosts.length > 0){
    res.status(200).json({length: userPosts.length, userPosts})
  } else{
    res.status(404).json({message: "No data found for given user"})
  }
})


// update single post with id
app.put('/posts/:id', (req, res)=> {
  const id = parseInt(req.params.id)
  const updatePost = req.body
  posts = posts.map((post) => (post.postId === id ? updatePost : post))
  res.json(updatePost)
})

// delete single post with id
app.delete('/posts/:id', (req, res)=> {
  const id = parseInt(req.params.id)
  const updatePost = req.body
  posts = posts.filter((post) => (post.postId !== id))
  res.status(204).send(updatePost)
})



// Open connection
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
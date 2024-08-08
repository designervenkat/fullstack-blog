const apiURL = "http://localhost:3000/posts"

const postForm = document.getElementById('postForm')
const postList = document.getElementById('postList')
const postItems = document.getElementById('postItems')

let posts = []


// Get all post
async function fetchPosts(){
  const response = await fetch(apiURL)
  posts = await response.json()

  postItems.innerText = posts.length
  postList.innerHTML = ''

  posts.forEach((post) => {
    const div = document.createElement('div')
    div.className = 'flex flex-col bg-white border border-gray-200 rounded-md'

    div.innerHTML = `
    
    <div class="p-4 h-44 text-sm text-pretty text-gray-800 overflow-hidden">${post.body}</div>
          

          <div class="px-4">
            <div class="w-full h-0 border-t-2 border-gray-200 border-dotted"></div>
            <div class="flex items-center justify-between py-2">
                <p class="text-base font-semibold text-gray-800 truncate">
                  ${post.title}
                </p>

                <div class="flex items-center gap-3">
                  <button
                      class="bg-gray-100 w-10 h-10 block rounded-full hover:bg-green-100 flex items-center justify-center text-green-600"
                      onclick="editPost(${post.postId})">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16">
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                  </button>
                  <button
                      class="bg-gray-100 w-10 h-10 block rounded-full hover:bg-red-100 flex items-center justify-center text-red-600"
                      onclick="deletePost(${post.postId})">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash3"
                        viewBox="0 0 16 16">
                        <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                  </button>
                </div>
            </div>
          </div>
    `

    postList.appendChild(div)
  })
}


async function createPost(post) {
  await fetch(apiURL, {
    method: "POST",
    headers: {
      'Content-Type': "application/json",      
    },
    body: JSON.stringify(post)
  })
  fetchPosts()
}


// update post
// http://localhost:3000/posts/
async function updatePost(post) {
  await fetch(`${apiURL}/${post.postId}`, {
    method: "PUT",
    headers: {
      'Content-Type': "application/json",      
    },
    body: JSON.stringify(post)
  })
  fetchPosts()
}

async function deletePost(id) {
  await fetch(`${apiURL}/${id}`, {
    method: "DELETE",
  })
  fetchPosts()
}


function editPost(id){
  const post = posts.find((post) => post.postId === id)
  if(post){
    document.getElementById('postId').value = post.postId
    document.getElementById('title').value = post.title
    document.getElementById('body').value = post.body
  }
}


postForm.addEventListener('submit', async(e) => {
  e.preventDefault()

  const postId = document.getElementById('postId').value 
  const title = document.getElementById('title').value 
  const body = document.getElementById('body').value

  const post = {
    postId: postId ? parseInt(postId) : Date.now(),
    title,
    body
  }

  if(postId){
    await updatePost(post)
  } else {
    await createPost(post)
  }

  postForm.reset()

})



fetchPosts()
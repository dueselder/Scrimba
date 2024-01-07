const posts = [
    {
        user: {
            name: "Vincent van Gogh",
            username: "vincey1853",
            location: "Zundert, Netherlands",
            avatar: "images/avatar-vangogh.jpg",
        },
        image: "images/post-vangogh.jpg",
        actions: {
            like: "images/icon-heart.png",
            comment: "images/icon-comment.png",
            share: "images/icon-dm.png",
        },
        likes: 21,
        comments: [
            {
                author: "vincey1853",
                content: "just took a few mushrooms lol",
            },
        ],
    },
    {
        user: {
            name: "Gustave Courbet",
            username: "gus1819",
            location: "Ornans, France",
            avatar: "images/avatar-courbet.jpg",
        },
        image: "images/post-courbet.jpg",
        actions: {
            like: "images/icon-heart.png",
            comment: "images/icon-comment.png",
            share: "images/icon-dm.png",
        },
        likes: 4,
        comments: [
            {
                author: "gus1819",
                content: "i'm feelin a bit stressed tbh",
            },
        ],
    },
    {
        user: {
            name: "Joseph Ducreux",
            username: "jd1735",
            location: "Paris, France",
            avatar: "images/avatar-ducreux.jpg",
        },
        image: "images/post-ducreux.jpg",
        actions: {
            like: "images/icon-heart.png",
            comment: "images/icon-comment.png",
            share: "images/icon-dm.png",
        },
        likes: 152,
        comments: [
            {
                author: "jd1735",
                content: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
            },
        ],
    },
];

// Element variables
const parentElement = document.querySelector('main');

function likePost(post, likesElement) {
    // Increase the likes count
    post.likes++;

    // Update the likes element
    likesElement.textContent = `${post.likes} likes`;
}

// Create Post Function
function createPostElement(post) {
    // Create a new article element
    const postElement = document.createElement('article'); // creates <article>
    postElement.className = "post"; // sets class="post"

    // Set its inner HTML from the post object
    postElement.innerHTML = `
        <header class="post__header">
            <img src="${post.user.avatar}" alt="User Avatar">
            <div class="post__info">
                <span class="post__username bold">${post.user.name}</span>
                <span class="post__location">${post.user.location}</span>
            </div> 
        </header>
        <div class="post__image">
            <img src="${post.image}" alt="Post Image" id="post-image">
        </div>
        <footer class="post__actions">
            <div class="post__icons">
                <img src="${post.actions.like}" alt="Heart Icon" id="like-button">
                <img src="${post.actions.comment}" alt="Comment Icon">
                <img src="${post.actions.share}" alt="Share Icon">
            </div>
            <div class="post__likes">
                <span class="post__likes-counter bold">${post.likes} likes</span>
            </div>
        </footer>
        <section class="post__comments">
            ${post.comments.map(comment => `
                <div class="post__comment">
                    <span class="post__comment--author bold">${comment.author}</span>
                    <span class="post__comment--content">${comment.content}</span>
                </div>
            `).join('')}
        </section>
    `;

    // Find the like button, image, and likes counter within postElement
    const likeButtonEl = postElement.querySelector("#like-button");
    const postImageEl = postElement.querySelector("#post-image");
    const likesEl = postElement.querySelector(".post__likes-counter");

    // Set up event listeners
    likeButtonEl.addEventListener("click", function() {
        likePost(post, likesEl);
    });

    postImageEl.addEventListener("dblclick", function() {
        likePost(post, likesEl);
    });

    // Return the new post element
    return postElement;
}

// Assuming 'posts' is an array of your post objects
posts.forEach(post => {
    const postElement = createPostElement(post);
    parentElement.appendChild(postElement);
});


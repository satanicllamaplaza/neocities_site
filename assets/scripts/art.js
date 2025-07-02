
let currentPostIndex = 0;
const posts = [
  { title: 'Angel City 08.18.2024', path: '../assets/blogs/art/angel_city_08.18.2024.html' },
  { title: 'Wife and Puppy 07.24.2024', path: '../assets/blogs/art/wife_and_puppy_07.24.2024.html' },
  // Add more posts here as needed
];

function loadPost(index) {
  console.log('Loading post:', posts[index].path); // Debug log
  fetch(posts[index].path)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(content => {
      document.getElementById('post-container').innerHTML = content;
    })
    .catch(error => console.error('Error loading post:', error));
}

function changePost(direction) {
  // Calculate the new index based on direction
  let newIndex = currentPostIndex + direction;
  
  // Ensure the new index is within bounds
  if (newIndex < 0) {
    newIndex = 0; // Prevent moving before the first post
  } else if (newIndex >= posts.length) {
    newIndex = posts.length - 1; // Prevent moving beyond the last post
  }
  
  // Only update if the new index is different
  if (newIndex !== currentPostIndex) {
    currentPostIndex = newIndex;
    loadPost(currentPostIndex);
    updateSidebarHighlight(); // Update sidebar highlight
  }
}

// Load the initial page without any content (no post is shown yet)
document.addEventListener('DOMContentLoaded', () => {
  if (posts.length > 0) {
    populateSidebar(); // Populate the sidebar with titles, but do not load any post initially
  } else {
    console.warn('No posts available to load');
  }
});

function populateSidebar() {
  const titleList = document.getElementById('post-titles'); // Corrected ID
  titleList.innerHTML = ''; // Clear any existing content
  posts.forEach((post, index) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = post.title;
    link.href = '#'; // Prevent default link action
    link.onclick = (event) => {
      event.preventDefault(); // Prevent default link behavior
      currentPostIndex = index;
      loadPost(currentPostIndex); // Load post content when a link is clicked
      updateSidebarHighlight(); // Update sidebar highlight
    };
    li.appendChild(link);
    titleList.appendChild(li);
  });
}

function updateSidebarHighlight() {
  const items = document.querySelectorAll('#post-titles li');
  items.forEach((item, index) => {
    item.style.backgroundColor = (index === currentPostIndex) ? '#2d2d2d' : ''; // Highlight current post
    item.style.color = (index === currentPostIndex) ? '#c09129' : ''; // Change text color of current post
  });
}


let currentPostIndex = 0;
const posts = [
  { title: 'Forever Summers, Pico-8 p.1', path: '../assets/blogs/forever_summers/part_1/forever_summers_part_1.html' },
  { title: 'FILM SOUP, lomo p.1', path: '../assets/blogs/home/film_soup.html' },
  { title: 'A Skrillex Story Part 1', path: '../assets/blogs/home/a_skrillex_story_part_1.html' },
  { title: 'Unhoused Testimonials Part 1', path: '../assets/blogs/home/starting_testimonials.html' },
  { title: 'HTML Rage', path: '../assets/blogs/home/HTML_Rage.html' },
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
      document.getElementById('content_box').innerHTML = content;
      initializePlayers();
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

const header = document.createElement('h2');
header.textContent = 'Blog Posts';
header.style.textAlign = 'center';
document.getElementById('side_bar_list').appendChild(header);

function populateSidebar() {
  const titleList = document.createElement('ul');
  titleList.classList.add('side_bar_list');
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
    document.getElementById('side_bar_list').appendChild(titleList);
  });
}

function updateSidebarHighlight() {
  const items = document.querySelectorAll('#side_bar_list li');
  items.forEach((item, index) => {
    item.style.color = (index === currentPostIndex) ? '#c09129' : ''; // Change text color of current post
  });
}


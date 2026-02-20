fetch("bookmark_data.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("bookmark-container").innerHTML = html;
  })
  .catch(err => console.error("Failed to load bookmarks:", err));


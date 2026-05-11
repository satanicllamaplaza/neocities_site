fetch("documentary_recs.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("side_bar_list").innerHTML = html;
  })
  .catch(err => console.error("Failed to load bookmarks:", err));


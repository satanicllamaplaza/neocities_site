fetch("bottom_bar.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("bottom_bar_container").innerHTML = html;
  })
  .catch(err => console.error("Failed to load bottom bar:", err));


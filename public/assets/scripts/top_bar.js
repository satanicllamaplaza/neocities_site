fetch("top_bar.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("top_bar_container").innerHTML = html;
  })
  .catch(err => console.error("Failed to load top bar:", err));


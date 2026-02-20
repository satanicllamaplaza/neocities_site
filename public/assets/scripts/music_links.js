function openRandomLink() {
  console.log("openRandomLink function triggered!");
  // List of links
  const links = [
    'https://soundcloud.com/dancesocial/grammys-place',
    'https://open.spotify.com/playlist/3QKwl8Gdt7AEfyl2O9zDFd',
    'https://www.youtube.com/watch?v=PevDftElMQY&list=RDPevDftElMQY&start_radio=1',
  ];

  // Pick a random index from the list
  const randomIndex = Math.floor(Math.random() * links.length);

  // Open the randomly selected link
  window.open(links[randomIndex], '_blank');
}

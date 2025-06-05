document.addEventListener("DOMContentLoaded", () => {
   loadPlaylistPage()
})

function createPlaylistCard(card){
   let newCard = document.createElement("div")
   newCard.className = "card"
   newCard.onclick = "openModal()"
   newCard.innerHTML = `
      <img class="playlist-image" src="${card.playlist_art}">
      <h4>${card.playlist_name}</h4>
      <p>${card.playlist_author}</p>
      <div class="likes">
         <button class="likebutton">Likes: ${card.playlistLikes}</button>
      </div>
   `
   return newCard
}

function loadPlaylistPage(){
   const newplaylistData = document.getElementById("playlist-cards")
   playlistData.forEach( playlist => {
      const elem = createPlaylistCard(playlist)
      newplaylistData.appendChild(elem)
   })
}




//Modal Script
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(/*playlist*/) {
   //document.getElementById('playlistName').innerText = playlist.name;
   //document.getElementById('playlistImage').src = playlist.imageUrl;
   //document.getElementById('creatorName').innerText = playlist.creatorName;
   //document.getElementById('song-car').innerHTML = `${playlist.songs.join(', ')}`;
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}
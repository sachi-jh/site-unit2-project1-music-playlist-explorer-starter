document.addEventListener("DOMContentLoaded", () => {
   loadPlaylistPage()
})

function loadPlaylistPage(){
   const newplaylistData = document.getElementById("playlist-cards")
   playlistData.forEach( playlist => {
      const elem = createPlaylistCard(playlist)
      newplaylistData.appendChild(elem)
   })
}

function createPlaylistCard(card){
   let newCard = document.createElement("div")
   newCard.className = "card"
   newCard.setAttribute("onClick", "openModal()")
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






//Modal Script
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   /*document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('creatorName').innerText = playlist.playlist_author;*/
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
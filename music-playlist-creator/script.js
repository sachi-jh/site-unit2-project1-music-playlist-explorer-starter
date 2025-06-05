//document.addEventListener("DOMContentLoaded", () => {
   // 1. checked if an element existed on the current page
   // 2. if yes, then call whatever function.
   //loadFeaturedPlaylistPage()
   /*if (document.querySelector("featured-section")){
      
   } 
   if (document.querySelector("playlist-cards")){
      loadPlaylistPage()
      const modal = document.getElementById("playlistModal");
      const span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
         modal.style.display = "none";
      }
      window.onclick = function(event) {
         if (event.target == modal) {
            modal.style.display = "none";
         }
      }
   }*/
   
//})
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function loadFeaturedPlaylistPage(){
   const featuredPlaylistdiv = document.getElementById("featured-playlist-info")
   const featuredPlaylist = playlistData[Math.floor(Math.random() * playlistData.length)]
   featuredPlaylistdiv.innerHTML = `
      <div>
         <img id="featuredPlaylistImage" src="${featuredPlaylist.playlist_art}" alt="playlist Image">
         <div>
            <h1 id="featuredPlaylistName">${featuredPlaylist.playlist_name}</h1>
            <h3 id="featuredCreatorName">${featuredPlaylist.playlist_author}</h3>
         </div>
      </div>
   `
}

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
   //newCard.setAttribute("onClick", "openModal()")
   newCard.innerHTML = `
      <div class="clickable-area">
         <img class="playlist-image" src="${card.playlist_art}">
         <h4>${card.playlist_name}</h4>
         <p>${card.playlist_author}</p>
      </div>
      <div class="likes">
         <button data-id="${card.playlistID}" onclick="likes(this)" data-liked="false"><i class="fa-regular fa-heart"></i> ${card.playlistLikes}</button>
      </div>
   `
   newCard.getElementsByClassName("clickable-area")[0].addEventListener("click", () => openModal(card))

   return newCard
}

function likes(button){
   const id = button.getAttribute('data-id');
	const isLiked = button.getAttribute('data-liked') === 'true';
   let likesCount = parseInt(button.textContent.match(/\d+/)[0], 10);

   if (isLiked){
      likesCount -= 1;
		button.innerHTML = `<i class="fa-regular fa-heart"></i> ${likesCount}`;
		button.setAttribute('data-liked', 'false');
   } else {
      likesCount += 1;
		button.innerHTML = `<i class="fa-solid fa-heart"></i> ${likesCount}`;
		button.setAttribute('data-liked', 'true');
   }
}




//Modal Script


function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('creatorName').innerText = playlist.playlist_author;
   //document.getElementsByClassName('modal-content')[0].appendChild()
   displaySongList(playlist.songs)
   //document.getElementsByClassName("song-cards").innerHTML = newSongList
   document.getElementById("shufflebutton").addEventListener("click", () =>{
      //shuffle songs code
      const songArr = playlist.songs
      //console.log(songArr)
      const shuffledArray = songArr.sort((a, b) => 0.5 - Math.random());
      displaySongList(shuffledArray)

   })
   modal.style.display = "block";
}

function displaySongList (songsArr){
   const newSongList = document.getElementsByClassName("song-cards")[0]
   //console.log(newSongList)
   newSongList.innerHTML = ``
   songsArr.forEach(song => {
      let newSong = document.createElement("div")
      newSong.className = "song-card"
      newSong.innerHTML = `
         <img class="song-image" src="${song.songImage}">
         <div>
            <h4>${song.songTitle}</h4>
            <p>${song.artistName}</p>
            <p>${song.albumName}</p>
         </div>
         <p class="runtime">${song.runTime}</p>
      `
      //console.log(newSong)
      newSongList.appendChild(newSong)
   })
}

if(document.getElementById("playlistModal")){
   
   span.onclick = function() {
      modal.style.display = "none";
   }
   window.onclick = function(event) {
      if (event.target == modal) {
         modal.style.display = "none";
      }
   }
}

if (document.getElementById("featured-section")){
      console.log("if branch")
      loadFeaturedPlaylistPage()
      
} else{
      loadPlaylistPage()
      console.log("else")
      
   }
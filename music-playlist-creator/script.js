const modal = document.getElementById("playlistModal");
const modalForm = document.getElementById("addPlaylistModal");
const modalEdit = document.getElementById("editPlaylistModal");
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close")[1];
const span3 = document.getElementsByClassName("close")[2];
let songcount = 1
let addedplaylists

function add(){
   const divElem = document.getElementById("added-inputs")
   divElem.innerHTML += `
      <div class="songlist">
      <label for="added-song-name">Song Name:</label>
      <input type="text" class="added-song-name" name="added-song-name" required/>
      <label for="added-artist-name">Artist Name:</label>
      <input type="text" class="added-artist-name" name="added-artist-name" required/>
      <label for="added-album-name">Album Name:</label>
      <input type="text" class="added-album-name" name="added-album-name" required/>
      <label for="added-song-runtime">Runtime:</label>
      <input type="text" class="added-song-runtime" name="added-song-runtime" required/>
      <button onclick="remove(this)">Remove</button>
      </div>
   `
   songcount++
   console.log(songcount)
}
function add2(){
   const divElem = document.getElementById("added-inputs-edit")
   divElem.innerHTML += `
      <div class="songlist">
                        <label for="edit-added-song-name">Song Name:</label>
                        <input type="text" class="edit-added-song-name" name="added-song-name" required/>
                        <label for="edit-added-artist-name">Artist Name:</label>
                        <input type="text" class="edit-added-artist-name" name="added-artist-name" required/>
                        <label for="edit-added-album-name">Album Name:</label>
                        <input type="text" class="edit-added-album-name" name="added-album-name" required/>
                        <label for="edit-added-song-runtime">Runtime:</label>
                        <input type="text" class="edit-added-song-runtime" name="added-song-runtime" required/>
      <button onclick="remove(this)">Remove</button>
      </div>
   `
   songcount++
   console.log(songcount)
}
function remove(btn){
   btn.parentElement.remove();
   songcount--
   console.log(songcount)
}

function addPlaylistButton(event){
   event.preventDefault();
   console.log("here");
   const playlistname = document.getElementById("playlist-name").value
   const playlistauthor = document.getElementById("playlist-creator-name").value
   const songname = document.getElementsByClassName("added-song-name")[0].value
   const artistname = document.getElementsByClassName("added-artist-name")[0].value
   const albumname = document.getElementsByClassName("added-album-name")[0].value
   let d = new Date()
   
   let arrobj = {
      playlistID: playlistData.length+1,
      playlist_name: playlistname,
      playlist_author: playlistauthor,
      playlist_art: "assets\\img\\playlist.png",
      playlistLikes: 0,
      playlistDate: d.getMinutes,
      songs: [{songTitle: songname, songImage: "assets\\img\\song.png", artistName: artistname, albumName: albumname, runTime: "0:00"}]
   }

   for(let i = 1; i < songcount; i++){
      const a = document.getElementsByClassName("added-song-name")[i].value
      const b = document.getElementsByClassName("added-artist-name")[i].value
      const c = document.getElementsByClassName("added-album-name")[i].value
      arrobj.songs.push({songTitle: a, songImage: "assets\\img\\song.png", artistName: b, albumName: c, runTime: "0:00"})
   }

   //console.log(arrobj)
//figure out how to modify array
   addedplaylists.push(arrobj)
   
   const newplaylistData = document.getElementById("playlist-cards")
   newplaylistData.appendChild(createPlaylistCard(arrobj))
   document.getElementById("added-inputs").innerHTML = ``

   event.target.reset();


}

function editPlaylistButton(event){
   event.preventDefault();
   console.log("here");
   const playlistname = document.getElementById("edit-playlist-name").value
   const playlistauthor = document.getElementById("edit-playlist-creator-name").value
   const songname = document.getElementsByClassName("edit-added-song-name")[0].value
   const artistname = document.getElementsByClassName("edit-added-artist-name")[0].value
   const albumname = document.getElementsByClassName("edit-added-album-name")[0].value

   
   let arrobj = {
      playlistID: playlistData.length+1,
      playlist_name: playlistname,
      playlist_author: playlistauthor,
      playlist_art: "assets\\img\\playlist.png",
      playlistLikes: 0,
      songs: [{songTitle: songname, songImage: "assets\\img\\song.png", artistName: artistname, albumName: albumname, runTime: "0:00"}]
   }

   for(let i = 1; i < songcount; i++){
      const a = document.getElementsByClassName("edit-added-song-name")[i].value
      const b = document.getElementsByClassName("edit-added-artist-name")[i].value
      const c = document.getElementsByClassName("edit-added-album-name")[i].value
      arrobj.songs.push({songTitle: a, songImage: "assets\\img\\song.png", artistName: b, albumName: c, runTime: "0:00"})
   }

   //console.log(arrobj)
//figure out how to modify array
   //playlistData.push(arrobj)
   
   //const newplaylistData = document.getElementById("playlist-cards")
   //newplaylistData.appendChild(createPlaylistCard(arrobj))

   //event.target.reset();
}

function sortByDate(){
   let temparr = playlistData//.concat(addedplaylists)
   let arr = temparr.sort((a, b) => a.playlistDate - b.playlistDate)
   const newplaylistData = document.getElementById("playlist-cards")
   newplaylistData.innerHTML = ``
   arr.forEach( playlist => {
      const elem = createPlaylistCard(playlist)
      newplaylistData.appendChild(elem)
   })
}

function sortDefault(){
   let temparr = playlistData//.concat(addedplaylists)
   let arr = temparr.sort((a, b) => a.playlistID - b.playlistID)
   const newplaylistData = document.getElementById("playlist-cards")
   newplaylistData.innerHTML = ``
   arr.forEach( playlist => {
      const elem = createPlaylistCard(playlist)
      newplaylistData.appendChild(elem)
   })
}

function sortByLikes(){
   let temparr = playlistData//.concat(addedplaylists)
   let arr = temparr.sort((a, b) => b.playlistLikes - a.playlistLikes)
   const newplaylistData = document.getElementById("playlist-cards")
   newplaylistData.innerHTML = ``
   arr.forEach( playlist => {
      const elem = createPlaylistCard(playlist)
      newplaylistData.appendChild(elem)
   })
}

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
   const featplaylistsongdiv = document.getElementById("featured-song-cards")
   featuredPlaylist.songs.forEach(song => {
      let newSong = document.createElement("div")
      newSong.className = "featured-song-card"
      newSong.innerHTML = `
         <img class="featured-song-img" src="${song.songImage}">
         <div class="song-text">
            <h4>${song.songTitle}</h4>
            <p>${song.artistName}</p>
            <p>${song.albumName}</p>
         </div>
         <p>${song.runTime}</p>
      `
      //console.log(newSong)
      featplaylistsongdiv.appendChild(newSong)
   })

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
         <div class="dropdown">
            <button onclick="openOptions(${card.playlistID})" class="dropbtn">more options</button>
            <div id="myDropdown${card.playlistID}" class="dropdown-content">
               <a href="#" onclick="removeCard(${card.playlistID})">Delete</a>
               <a href="#" onclick="editPlaylistModal(${card.playlistID})">Edit</a>
            </div>
         </div>
      </div>
   `
   newCard.getElementsByClassName("clickable-area")[0].addEventListener("click", () => openModal(card))

   return newCard
}

function removeCard(id){
   const remcard = document.getElementsByClassName("card")[id-1]
   console.log(remcard)
   remcard.remove()
}

function openOptions(id) {
   console.log("myDropdown" + id)
   const divelem = document.getElementById("myDropdown" + id)
   divelem.classList.toggle("show");
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

function openModalForm(){
   modalForm.style.display = "block";
}

function editPlaylistModal(id){
   document.getElementById("added-inputs-edit").innerHTML = ``
   document.getElementById("edit-playlist-name").value = playlistData[id-1].playlist_name
   document.getElementById("edit-playlist-creator-name").value = playlistData[id-1].playlist_author
   console.log(playlistData[id-1].songs[0].songTitle)
   document.getElementsByClassName("edit-added-song-name")[0].value = playlistData[id-1].songs[0].songTitle
   document.getElementsByClassName("edit-added-artist-name")[0].value = playlistData[id-1].songs[0].artistName
   document.getElementsByClassName("edit-added-album-name")[0].value = playlistData[id-1].songs[0].albumName
   document.getElementsByClassName("edit-added-song-runtime")[0].value = playlistData[id-1].songs[0].runTime

   for(let i = 1; i < playlistData[id-1].songs.length; i++) {
      add2()
   }

   for(let i = 1; i < playlistData[id-1].songs.length; i++) {
      //add()
      document.getElementsByClassName("edit-added-song-name")[i].value = playlistData[id-1].songs[i].songTitle
      document.getElementsByClassName("edit-added-artist-name")[i].value = playlistData[id-1].songs[i].artistName
      document.getElementsByClassName("edit-added-album-name")[i].value = playlistData[id-1].songs[i].albumName
      document.getElementsByClassName("edit-added-song-runtime")[i].value = playlistData[id-1].songs[i].runTime
   }
   modalEdit.style.display = "block";
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

if(document.getElementById("addPlaylistModal")){
   
   span2.onclick = function() {
      modalForm.style.display = "none";
   }
   window.onclick = function(event) {
      if (event.target == modal) {
         modalForm.style.display = "none";
      }
   }
}

if(document.getElementById("editPlaylistModal")){
   
   span3.onclick = function() {
      modalEdit.style.display = "none";
   }
   window.onclick = function(event) {
      if (event.target == modal) {
         modalEdit.style.display = "none";
      }
   }
}

if(document.getElementsByClassName("dropdown-content")){
   window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
         var dropdowns = document.getElementsByClassName("dropdown-content");
         var i;
         for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
         }
         }
      }
}

function checkVal (){
   if (document.getElementById('selectsort').value == "date"){
      //console.log(document.getElementById('selectsort').value)
      sortByDate()
   } else if (document.getElementById('selectsort').value == "default"){
      //console.log(document.getElementById('selectsort').value)
      sortDefault()
   } else if (document.getElementById('selectsort').value == "likes"){
      sortByLikes()
   }
}

if (document.getElementById("featured-section")){
      console.log("if branch")
      loadFeaturedPlaylistPage()
      
} else if(document.getElementById("playlist-cards")){
      loadPlaylistPage()
      console.log("else")
      document.getElementById('newPlaylist').addEventListener('submit', addPlaylistButton);
      //document.getElementById('edit').addEventListener('submit', editPlaylistButton);
      

      
} else {
}
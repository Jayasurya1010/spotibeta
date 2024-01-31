const currentsong= new Audio()
function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds)||seconds<0){
        return ""
    }
    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingseconds).padStart(2,'0');
    return `${formattedMinutes}:${formattedSeconds}`
}
async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/")
let response = await a.text();
let div =document.createElement("div")
div.innerHTML=response;
let as = div.getElementsByTagName("a")
let songs =[]
for (let index=0 ; index < as.length; index++){
    const element = as[index]
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
   
   }
   return songs

}

const playMusic =(track)=>{
    // const audio = new Audio("songs/"+track)
    currentsong.src="songs/"+track
    currentsong.play()
    play.src="pause.svg" 
    document.querySelector(".information").innerHTML=track.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll('%5D'," ")
    document.querySelector(".songtime").innerHTML="00:00/00:00"

}
async function main(){
    

    //get the list of all songs
    let songs=await getSongs()
    console.log(songs)
    console.log(songs[0])
    //show all the songs in the playlist
    const songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
    
   for (const song of songs){
              
             
              songname=songUL.innerHTML+`<li>
              
              <div class="flex songlistdivs">
                  <img src="./assests/music.svg">
              <div class="songinfo" style="margin-left: 5px;">
                  <div class='songname'> ${song.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll('%5D'," ")}</div>
                  <div class="songurl" style="display:none" >
                  ${song}
                  </div>
                  
                  
              </div>
              <img src="./assests/play.svg" alt="playnow">
              </div>
          
              </li>`;
              songUL.innerHTML=songname
              
              
   }
    //Attach event listener to each  song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        
        e.addEventListener("click" , element=>{
             
             // console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".songurl").innerHTML.trim())
    })
   })
    
    // //play rhe first song
    // const audio = new Audio(songs[0]);
    

   //Attach an event listener to play , next and previous
   play.addEventListener("click" , ()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
       
    }else{
        currentsong.pause()
        play.src="play.svg"
    }
   })
   //Listen for time update event
   currentsong.addEventListener("timeupdate" , ()=>{
    
    document.querySelector(".songtime1").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}`
    document.querySelector(".songtime2").innerHTML=`${secondsToMinutesSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"

   })
  //Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",e=>{
    // const percent=(e.offSetX/e.target.getBoundingClientRect().width)*100;
    // document.querySelector(".circle").style.left=percent+"%";
    // currentsong.currentTime=((currentsong.duration)*percent)/100
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left=percent+"%";
    currentsong.currentTime=((currentsong.duration)*percent)/100
  })
  //Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click" ,()=>{
    document.querySelector(".left").style.left="0"
  })

  //Add an event listener for close
  document.getElementsByClassName("close")[0].addEventListener("click" ,()=>{
   
    document.querySelector(".left").style.left="-100%" 
    
    
   
  })

  
}
main()
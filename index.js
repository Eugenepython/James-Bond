import {teamData} from './data.js'
import {images} from './data.js'

let teamArray = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8", "Team 9", "Team 10", "Team 11", "Team 12", "Team 13", "Team 14", "Team 15", "Team 16", "Team 17", "Team 18", "Team 19", "Team 20", "Team 21", "Team 22", "Team 23", "Team 24", "Team 25", "Team 26"]

// Define the "teams" object
let teams = {};
for (let i = 0; i < teamArray.length; i++) {
  teams[teamArray[i]] = 0;
}
p1.style.display = 'none';
p2.style.display = 'none';
container.style.display = 'none';


let matchArray = [];
for (let i = 0; i < teamArray.length; i++) {
  for (let j = i + 1; j < teamArray.length; j++) {
    matchArray.push([teamArray[i], teamArray[j]]);
  }}

let matches = matchArray.sort((a, b) => Math.random() - .5);

let button1 = document.getElementById('button1') 
let button2 = document.getElementById('button2')
let button1Holder = document.getElementById('button1holder');
let button2Holder = document.getElementById('button2holder');
let parent = document.getElementById('parent');

h1.style.display = 'block'
h2.style.display = 'none'

button1.style.display = 'none'
button2.style.display = 'none'
button1Holder.style.display = 'none'
button2Holder.style.display = 'none'
let i = 0
let progress

function firstMatch(){
  backGround()
  container.style.display = 'block';
  h2.style.display = 'block'
  h1.style.display = 'none'
    button1.style.display = 'block'
    button2.style.display = 'block' 
    let team1 = matches[i][0];
    let team2 = matches[i][1];
    i++
    start.style.display = 'none'
    startHolder.style.display= 'none'
    p1.innerText = team1
    p2.innerText = team2
    button1Holder.style.display = 'block'
    button2Holder.style.display = 'block'
    button1.style.backgroundImage = `url(${teamData[p1.innerText].image})`;
    button2.style.backgroundImage = `url(${teamData[p2.innerText].image})`;                   
    console.log(team1)
    }
    i-1
    
function playNext(){ 
  backGround()
      let sortedTeams = Object.entries(teams)
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return a[1] - b[1];
      } else {
        let indexA = matchArray.findIndex(match => match.includes(a[0]));
        let indexB = matchArray.findIndex(match => match.includes(b[0]));
        return indexA - indexB;
      }
    })
    .map(([teamName, points]) => teamName);
    if (i <  matches.length){
    let team1 = matches[i][0];
    let team2 = matches[i][1];
    i++
    console.log(i)
    let percent = ((i-1)/325)*100
    console.log(percent)
    //console.log(percent)
   document.getElementById('correctHealth').innerHTML = `<div class ="health-bar-outer">
                    <div class="goodhealth-bar-inner " 
                            style="width:${percent}%">
                    </div>
                </div>` 
    p1.innerText = team1
    p2.innerText = team2
    
    button1.style.backgroundImage = `url(${teamData[p1.innerText].image})`;
    button2.style.backgroundImage = `url(${teamData[p2.innerText].image})`;
    }
     
    else if (i = matches.length) {
      backGround()
        h2.style.display = 'none';
        button1.style.display = 'none';
        button2.style.display = 'none';
        button1holder.style.display = 'none';
        button2holder.style.display = 'none';
        goBack.style.display='none';
        console.log("end")
        console.log(sortedTeams)
        let teamNames = sortedTeams.map(teamName => teamData[teamName].name);
        let resultsArray = teamNames.slice().reverse(); 
        
        document.getElementById('resultsTitle').innerHTML =  `<p> This is your list of favourite Bond movies in order:  </p>`
        for (let i = 0; i < resultsArray.length; i++) { 
         document.getElementById('results').innerHTML += ('<p1>' + (i+1) + '</p1>' + " " + '<p2>' + resultsArray[i] + '</p2>' + '<br>')        
}
    }
    }  


// Add click event listeners for the buttons
button1.addEventListener('click', function() {
  // Update the points for the team that was chosen
  teams[p1.innerText]++;

  // Reorder the buttons
  parent.insertBefore(button1Holder, button2Holder);
  
  // Play the next match
  playNext();
});

button2.addEventListener('click', function() {
  // Update the points for the team that was chosen
  teams[p2.innerText]++;

  // Reorder the buttons
  parent.insertBefore(button2Holder, button1Holder);
  
  // Play the next match
  playNext();
});

function backGround(){
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImageUrl = images[randomIndex];
  document.body.style.backgroundImage = `url(${randomImageUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
}
backGround()
let backButton = document.getElementById("back-button");
backButton.addEventListener("click", goBackToBeginning);

function goBackToBeginning() {
  location.reload();
}

start.addEventListener('click', firstMatch);

function playPrevious(){
  if (i > 0) {
    i -= 2;
    let team1 = matches[i][0];
    let team2 = matches[i][1];
    p1.innerText = team1;
    p2.innerText = team2;
    button1.style.backgroundImage = `url(${teamData[p1.innerText].image})`;
    button2.style.backgroundImage = `url(${teamData[p2.innerText].image})`;
  } else {
    console.log("You are at the first match.")
  }
}
goBack.addEventListener("click", function(){
    console.log("hello")
    playPrevious()
})

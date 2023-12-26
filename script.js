// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZBitp23VlLsBO8dTy3T_j4XdRYu5S7_g",
  authDomain: "prime-flix-admin.firebaseapp.com",
  databaseURL: "https://prime-flix-admin-default-rtdb.firebaseio.com",
  projectId: "prime-flix-admin",
  storageBucket: "prime-flix-admin.appspot.com",
  messagingSenderId: "966157876320",
  appId: "1:966157876320:web:2840047505bd60cff15705",
  measurementId: "G-T05PGENNH7"
  };

firebase.initializeApp(firebaseConfig);


var namesArray = ["Seneshi", "Shamasha", "Shashini", "Tenara", "Nicole", "Lihara", "Natheesha", "Trevor", "Thesanya", "Rithun", "Roshel", "Clive", "Aron", "Venuki", "Nidukshan", "Imalki", "Britny", "Michelle", "Sanjana", "Collin", "Senaya", "Vinesh", "Nigel", "Wilfred", "Dewvin", "Regina", "Buthmi", "Rumitha", "Sithumini", "Aenock", "Sachini", "Kanesha", "Rashmika"];
var votedNames = [];
var ChosenNames = [];
var ipaddresses = [];

var database = firebase.database();
var VotedfirebaseRef = database.ref("VotedNames");
var ChosenFirebaseRef = database.ref("ChosenNames");
var IPAaddressFirebaseRef = database.ref("IPAddresses");


let Form = document.getElementById("mainForm");
let Names = document.getElementById("name");
let NameError = document.getElementById("nameError");
let ErrorName = document.getElementById("ErrorName");
let SubmitButton = document.getElementById("submitButton");
let mainDiv = document.getElementById("text");
let mainSection = document.getElementById("NameChooser");

let chosenNameViewer = document.getElementById("chosenNameViewer");
let box = document.getElementById("box");
let text = document.getElementById("text");
let fireworks = document.getElementById("fireworks");
let GivenName = document.getElementById("GivenName");
let messageName = document.getElementById("messageName");
let messageName2 = document.getElementById("messageName2");
let message = document.getElementById("message");
let ChosenNameeEelemnt = document.getElementById("voteName");



var VotingName = "";
var chosenName = "";


if(Names.value == "" ) {
    SubmitButton.disabled = true;
    SubmitButton.style.background = "#A7A7A7"
    SubmitButton.style.opacity = "0.5"
} else {
    SubmitButton.disabled = false;
    SubmitButton.style.background = "#cc0000"
    SubmitButton.style.opacity = "1"
}

readData();

var ipaddress = "";

// Using ipinfo.io to get the IP address
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    ipaddress = data.ip;
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
});


Names.addEventListener("change", checkforVotes, false);

function checkforVotes(){
    let name = Names.value;
    SubmitButton.style.opacity = "1"
    SubmitButton.disabled = false;
    if(votedNames.includes(name)) {
        ErrorName.innerHTML = name;
        NameError.style.visibility = "visible";
        SubmitButton.value = "See chosen Name"
        SubmitButton.style.background = "#0000cc"
    } else {
        NameError.style.visibility = "hidden";
        SubmitButton.style.opacity = "1"
        SubmitButton.value = "Continue"
        SubmitButton.style.background = "#cc0000"
    }
}

window.onbeforeunload = function(e) {
   window.scrollTo(0, 0);

  };


Form.addEventListener('submit', function(event) {
    event.preventDefault();

    VotingName = Names.value;

    mainSection.style.opacity = "0";
    
    setTimeout(function() {
        mainSection.style.opacity = "1";
        mainSection.innerHTML = `
        <div class="spinner">
        <h1 id="myName">Hi <span id="voteName"></span>,</h1>
        <h3 id="text">Your Secret Friend is</h3>

        
        <div style="height: 200px;">
            <div class="chosenContainer">
                <div class="nameBorder">
                    <div class="box" id="box">
                        <h1 id="GivenName">Name</h1>
                    </div>
                </div>

                <div class="fireworks" id="fireworks">
                    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

    <dotlottie-player src="https://lottie.host/9637f448-9393-465b-a177-2cab7d14f3e4/Mtldtl11zm.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
                </div>
        
                <div class="chosenNameViewer" id="chosenNameViewer">
                    <img class="spinWheel" src="./Images/wheel.gif" alt="wheel">
                </div>
            </div>
        </div>

        <div class="message"  id="message">
            <p>Prepare a gift for <span id="messageName">Name</span> before the 30th of December 2023.. <br>Gift budget: Rs. 1000 or below <br>and also make sure you don't tell <span id="messageName2">Name</span> anything about this 😉 ...</p>
            <p class="second">You can view this name anytime you click on this link and choose your name</p>

            <button onclick="location.reload()">Done</button>
        </div>
    </div>
        `

    chosenNameViewer = document.getElementById("chosenNameViewer");
    box = document.getElementById("box");
    text = document.getElementById("text");
    fireworks = document.getElementById("fireworks");
    GivenName = document.getElementById("GivenName");
    messageName = document.getElementById("messageName");
    messageName2 = document.getElementById("messageName2");
    message = document.getElementById("message");
    ChosenNameeEelemnt = document.getElementById("voteName");

    GenerateName(VotingName);
    }, 1000)


    ChosenNameeEelemnt.innerHTML = VotingName;

});


function nameGenerater(items) {
  
return items[Math.floor(Math.random()*items.length)];
     
}


function GenerateName(name) {

     if(SubmitButton.value == "Continue") {
        while (true) {
            chosenName = nameGenerater(namesArray);
    
         if(chosenName != name && !ChosenNames.includes(chosenName)) {
            
            break;
         } else {
            continue;
         }
         }

        writeUserData(VotingName, VotedfirebaseRef);
        writeUserData(chosenName, ChosenFirebaseRef);
        writeUserData(ipaddress, IPAaddressFirebaseRef);
     } else if(SubmitButton.value == "See chosen Name") {
        let index = votedNames.indexOf(name);
        chosenName = ChosenNames[index];
    
     }

    box.style.visibility = "visible";

    setTimeout(function() {

        fireworks.style.visibility = "visible"
        message.style.visibility = "visible"
        chosenNameViewer.style.opacity = "0";
        box.style.opacity = "1";
        GivenName.innerHTML = chosenName
        
        messageName.innerHTML = chosenName
        messageName2.innerHTML = chosenName
        
    }, 7000)

    setTimeout(function() {
        fireworks.style.visibility = "hidden"
    }, 6000)

}


function readData() {

    VotingName = [];
    ChosenNames = [];

    VotedfirebaseRef.once('value')
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          votedNames.push(userData);
        });
        console.log(votedNames);
      })
      .catch(function(error) {
        console.error('Error reading data:', error);
      });

      ChosenFirebaseRef.once('value')
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          ChosenNames.push(userData);
        });
        console.log(ChosenNames);
      })
      .catch(function(error) {
        console.error('Error reading data:', error);
      });

      IPAaddressFirebaseRef.once('value')
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          ipaddresses.push(userData);
        });
        console.log(ipaddresses);
      })
      .catch(function(error) {
        console.error('Error reading data:', error);
      });
    
}


function writeUserData(name, ref) {
    ref.push(name)
  }



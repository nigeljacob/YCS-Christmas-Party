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


var namesArray = ["Seneshi", "Shamasha", "Shashini", "Tenara", "Nicole", "Lihara", "Natheesha", "Trevor", "Thesanya", "Rithun", "Roshel", "Clive", "Aron", "Venuki", "Nidukshan", "Imalki", "Britny", "Michelle", "Sanjana", "Collin", "Senaya", "Vinesh", "Nigel", "Wilfred", "Dewvin", "Regina", "Buthmi", "Rumitha", "Sithumini", "Aenock", "Sachini", "Kanesha"];
var votedNames = [];
var ChosenNames = [];

var database = firebase.database();
var VotedfirebaseRef = database.ref("VotedNames");
var ChosenFirebaseRef = database.ref("ChosenNames");


let Form = document.getElementById("mainForm");
let Names = document.getElementById("name");
let NameError = document.getElementById("nameError");
let ErrorName = document.getElementById("ErrorName");
let SubmitButton = document.getElementById("submitButton");
let mainDiv = document.getElementById("text");
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

    GenerateName(VotingName);

    document.body.style.overflow = "scroll";
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    document.body.style.overflow = "hidden";

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
    
}


function writeUserData(name, ref) {
    ref.push(name)
  }



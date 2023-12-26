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


var namesArray = ["Seneshi", "Shamasha", "Shashini", "Tenara", "Nicole", "Lihara", "Natheesha", "Trevor", "Thesanya", "Rithun", "Roshel", "Clive", "Aron", "Venuki", "Nidukshan", "Imalki", "Britny", "Michelle", "Sanjana", "Collin", "Senaya", "Vinesh", "Nigel", "Wilfred", "Dewvin", "Regina", "Buthmi", "Rumitha", "Sithumini", "Aenock", "Sachini", "Kanesha", "Rashmika", "Abilakshini", "Chenuki"];
var ChosenNames = ['Aenock', 'Michelle', 'Britny', 'Kanesha', 'Nidukshan', 'Nigel', 'Roshel', 'Imalki', 'Venuki', 'Buthmi', 'Collin', 'Rashmika', 'Natheesha', 'Sanjana', 'Regina', 'Seneshi', 'Dewvin', 'Nicole', 'Tenara', 'Shamasha', 'Sithumini', 'Clive', 'Aron', 'Sachini', 'Shashini', 'Wilfred', 'Trevor', 'Lihara', 'Abilakshini', 'Chenuki', 'Vinesh', 'Thesanya', 'Rumitha', "Rithun", "Senaya"]
var votedNames = [];
var emailAddresses = [];


var database = firebase.database();
var VotedfirebaseRef = database.ref("VotedNames");
var IPAaddressFirebaseRef = database.ref("EmailAddress");


let Form = document.getElementById("mainForm");
let Names = document.getElementById("name");
let NameError = document.getElementById("nameError");
let ErrorName = document.getElementById("ErrorName");
let SubmitButton = document.getElementById("submitButton");
let mainDiv = document.getElementById("text");
let mainSection = document.getElementById("NameChooser");
let nameNotListedError = document.getElementById("nameNotListedError");

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
var emailAddress = "";

nameNotListedError.addEventListener('click', event => {
    alert("Contact +94 76 241 1294 for more help.... \nand also how many times was the reminder sent on the group to add your name to that list... 🤦");
});


if(Names.value == "") {
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

    if(SubmitButton.value == "Continue") {
        while(true) {
            var emailPrompt = prompt("Enter your email address.. \nNote: if your not " + VotingName + " then don't try this cuz it may ruin that person's chance");

            let promtValue = emailPrompt.toUpperCase();

            promtValue = promtValue.replace(/\s+/g, '');
    
            if(!emailAddresses.includes(promtValue)) {
        
                
                if(!promtValue.includes("@")) {
                    alert("Invalid email entered");
                    continue;
                }

                emailAddress = promtValue;

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

                ChosenNameeEelemnt.innerHTML = VotingName;
                }, 1000);

                break;
            } else {
                alert("Email already in use... use a different email");
                continue;
            }
        }
    } else if(SubmitButton.value == "See chosen Name") {
        while(true) {
            var emailPrompt = prompt("Enter the email address " + VotingName + " used to choose their person");

            var promtValue = emailPrompt.toUpperCase();

            promtValue = promtValue = str.replace(/\s+/g, '');

            if(emailAddresses.includes(promtValue)) {

                let index = emailAddresses.indexOf(promtValue);

                if(votedNames[index] != VotingName) {
                    alert("The email doesn't match the email " + VotingName + " had used.. try again");
                    continue;
                }

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

                ChosenNameeEelemnt.innerHTML = VotingName;
                }, 1000)

                break;
            } else {
                alert("Email not found.... type in the correct email");
                continue;
            }
        }
    }

});


function nameGenerater(items) {
  let index = items.indexOf(VotingName);
    return ChosenNames[index];
}


function GenerateName(name) {

    var available = false;

     if(SubmitButton.value == "Continue") {
        chosenName = nameGenerater(namesArray);

        IPAaddressFirebaseRef.once('value')
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          if(userData == emailAddress) {
            available = true;
          }

        });
        if(!available) {
            writeUserData(VotingName, VotedfirebaseRef);
            writeUserData(emailAddress, IPAaddressFirebaseRef);
        }
      })
      .catch(function(error) {
        console.error('Error reading data:', error);
      });

     } else if(SubmitButton.value == "See chosen Name") {

        chosenName = nameGenerater(namesArray);
    
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
    emailAddresses = [];

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

      IPAaddressFirebaseRef.once('value')
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          emailAddresses.push(userData);
        });
        console.log(emailAddresses);
      })
      .catch(function(error) {
        console.error('Error reading data:', error);
      });
}


function writeUserData(name, ref) {
    ref.push(name)
  }



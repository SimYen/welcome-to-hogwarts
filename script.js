console.log("welcome to hogwarts");

/*
Welcome to Hogwarts

Ask player which House to be sorted into, after which player needs to find the House Head within Hogwarts Castle.
*/

//display function
var display = function( data ){
  var displayElement = document.querySelector('#output');

  // get rid of the entire contents
  displayElement.innerHTML = "";

  // put the data into the div
  output.innerText = data;
};

//for easy update of display message
const input = document.getElementById("input");

//create object to store player details
var player = {
    name: null,
    house: null,
    target: null,
    targetsFound: null,
    gameProgress: null,
    currentLocation: null,
    currentTurn: null,
    targetTurn: null,
    lastInput: null,
    lastOutput: null,
};

//create object of House details
const housesOfHogwarts = [
    { name: "Gryffindor",
      head: "McGonagall",
      found: false
    },
    { name: "Hufflepuff",
      head: "Sprout",
      found: false
    },
    { name: "Ravenclaw",
      head: "Filtwick",
      found: false
    },
    { name: "Slytherin",
      head: "Snape",
      found: false
    },
];

//create object of castle rooms
/*
To explore: Rooms as array
DOM room in 3x3 by randomize room selected from array
(have to ensure all rooms DOM and no repeat...)
*/

var hogwartsCastle = [
    { location: "Gryffindor House",
      professor: "McGonagall",
      roomImg: "image/gryffindor.jpg",
      profImg: "image/mcgonagall.jpg"
    },
    { location: "Ravenclaw House",
      professor: "Filtwick",
      roomImg: "image/ravenclaw.jpg",
      profImg: "image/filtwick.jpg"
    },
    { location: "Charms Classroom",
      professor: "Filtwick",
      roomImg: "image/charms.jpeg",
      profImg: "image/filtwick.jpg"
    },
    { location: "Great Hall",       //room id = 3
      professor: "Dumbledore",
      roomImg: "image/great-hall.jpg",
      profImg: "image/dumbledore.jpg"
    },
    { location: "Transfiguration Classroom",
      professor: "McGonagall",
      roomImg: "image/transfiguration.jpeg",
      profImg: "image/mcgonagall.jpg"
    },
    { location: "Herbology Classroom",
      professor: "Sprout",
      roomImg: "image/herbology.jpeg",
      profImg: "image/sprout.jpg"
    },
    { location: "Hufflepuff House",
      professor: "Sprout",
      roomImg: "image/hufflepuff.jpg",
      profImg: "image/sprout.jpg"
    },
    { location: "Potions Classroom",
      professor: "Snape",
      roomImg: "image/potions.jpeg",
      profImg: "image/snape.jpg"
    },
    { location: "Slytherin House",
      professor: "Snape",
      roomImg: "image/slytherin.jpg",
      profImg: "image/snape.jpg"
    }
]

//to track progress of game
var gameCounter = 0;

var gameProgress = [ "getName", "getHouse", "findProfessor", "detention", "success" ];

var progressGame = function() {
    gameCounter ++;
    console.log( "Current game stage: " + gameProgress[gameCounter]);
}

//start game by crediting copyrights
alert("This game is based on Ⓒ J.K. Rowling's Wizarding World.\nCredit for images used belongs to their illustrators.");

var inputHappened = function(currentInput){
  console.log( currentInput );

  //check if is new game
  switch (gameProgress[gameCounter]) {

    //get name of player
    case "getName":

        //store player name
        player.name = currentInput;
        console.log( "Player name: " + player.name );

        //increment game progress
        progressGame();

        //ask for House
        input.value = "";
        lastInput = "Enter House";
        input.placeholder = lastInput;
        lastOutput = `Hi, ${player.name}. What House are you in?\n1) Gryffindor\n2) Hufflepuff\n3) Ravenclaw\n4) Slytherin`;
        return lastOutput;
        break;

    //get House of player
    case "getHouse":

        //check if currentInput is valid selection
        if (Number(currentInput) > 0 && Number(currentInput) < 5) {
            //store player house
            player.house = housesOfHogwarts[ Number(currentInput) - 1 ];
            console.log( "Player House: " + JSON.stringify(player.house) );

            //increment game progress
            progressGame();

            //set target to find
            player.target = player.house.head;
            console.log( "Finding: Professor " + player.target );

            //set default location to Great Hall
            player.currentLocation = hogwartsCastle[3];
            console.log( "Current location: " + JSON.stringify(player.currentLocation) );

            //initialize turn count
            player.currentTurn = 0;
            console.log("Turn start!")
            //generate target turns to complete task
            //min number of turns is 2
            player.targetTurn = Math.floor(Math.random()*hogwartsCastle.length/2) + 2;

            //inform player of target & turns
            input.value = "";
            lastInput = "Enter YES to start";
            input.placeholder = lastInput;
            lastOutput = `Please report to Professor ${player.target} of ${player.house.name} House.\nYou have ${player.targetTurn} turns to complete your task.`;
            return lastOutput;

        //repeat if invalid
        } else {
            input.value = "";
            input.placeholder = lastInput;
            return lastOutput;
        }

        break;

    //see where player wants to go
    case "findProfessor":
        console.log("Currently finding professor");

        //remove welcome screen
        var hideWelcome = document.getElementById("welcome");
        hideWelcome.classList.add("d-none");

        //create gameBoard
        createHogwarts();

    }
}

//DOM gameBoard
function createHogwarts(event) {
    var castle = document.createElement("div");
    castle.id = "hogwartsCastle";
    castle.classList.add("row");

    //create castle div to contain room divs
    for ( var i = 0; i < hogwartsCastle.length; i++ ) {
        var map = document.createElement("div");
        map.classList.add("col-4");

        //create display for rooms
        //how to reveal Great Hall from the start?
        var room = document.createElement("img");
        room.id = i;
        room.src = "image/chocfrog.jpg";
        room.classList.add("img-fluid");
        room.classList.add("rounded");
        room.addEventListener("click", revealRoom);
        map.appendChild(room);

        castle.appendChild(map);
    }

    var gameBoard = document.getElementById("hogwarts");
    gameBoard.appendChild(castle);

}

//reveal room when clicked
//check if target is found
//else add 1 turn
function revealRoom() {
    console.log(this);
    //show clicked room img
    this.src = hogwartsCastle[this.id].roomImg;

    hideBoard();
    roomScene(this.id);

}

function hideBoard() {
    var removeCastle = document.getElementById("hogwarts");
    removeCastle.classList.add("d-none");
}

function roomScene( roomId ) {
        //DOM roomScene
        console.log( "Room ID: " + roomId );
        var roomScene = document.createElement("div");
        roomScene.id = "roomScene";
        roomScene.classList.add("row");

        //show prof image
        var message1 = document.createElement("div");
        message1.classList.add("col-6");

        var profFound = document.createElement("img");
        profFound.src = hogwartsCastle[roomId].profImg;
        profFound.classList.add("img-fluid");
        profFound.classList.add("rounded");
        message1.appendChild(profFound);
        roomScene.appendChild(message1);

        //show msg
        var message2 = document.createElement("div");
        message2.classList.add("col-6");

        var profName = document.createElement("h3");
        profName.innerHTML = `Professor ${hogwartsCastle[roomId].professor}:`;
        message2.appendChild(profName);

        var profMsg = document.createElement("p");
        profMsg.innerHTML = statement( roomId );
        message2.appendChild(profMsg);

        //dismiss button
        var button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn");
        button.classList.add("btn-info");
        button.innerHTML = "OK";
        button.addEventListener("click", returnBoard);
        message2.appendChild(button);

        roomScene.appendChild(message2);

        var message = document.getElementById("messageBoard");
        message.appendChild(roomScene);
}

function returnBoard() {
    //clear messageBoard
    messageBoard.innerHTML = "";

    var showCastle = document.getElementById("hogwarts");
    showCastle.classList.remove("d-none");
}

//check what message to show
function statement( roomId ) {

    if ( player.target === hogwartsCastle[roomId].professor ) {

        console.log("You successfully found Professor " + player.target +"!");

        //check which house to update
        //update status to found
        for ( var i = 0; i < housesOfHogwarts.length; i++) {
            if ( player.target === housesOfHogwarts[i].head ) {
                housesOfHogwarts[i].found = true;
            }
        }

        player.targetsFound ++;
        console.log("Number of Heads found: " + player.targetsFound);

        //(new) if all target found (i.e targetCount = 4),
        //go to Great Hall for Dumbledore --> endGame
        if ( player.targetsFound >= housesOfHogwarts.length ) {
            //go to Great Hall for Dumbledore --> endGame
            var greatHall = document.getElementById("3")
            greatHall.removeEventListener("click", revealRoom);
            greatHall.addEventListener("click", welcomeAddress);
            player.target = hogwartsCastle[3].professor
            player.currentTurn = true;
            player.targetTurn = true;
            return `Please proceed to the Great Hall for the Welcoming Feast.`;
        }

        //get next target
        //check which House head not yet found
        function whichHead(house) {
            return house.found === false;
        }
        var toFind = housesOfHogwarts.find(whichHead);
        console.log(toFind);

        player.target = toFind.head;

        player.currentTurn = 0;
        player.targetTurn = Math.floor(Math.random()*hogwartsCastle.length/2) + 2;

        return `Your attendence is noted. Please proceed to report to Professor ${player.target}.<br>You have ${player.targetTurn} turns to complete your task.`;

    } else {

        //increment turns
        player.currentTurn++;

        //check if turns are up
        //progress to end game
        if ( player.currentTurn === player.targetTurn ) {

            setTimeout( function() { location.reload(); }, 3000 );

            return ("Sorry, you were late reporting to Professor " + player.target + ".<br>You got detention for tardiness and miss the Welcome Feast.");

        } else {

            return ("Professor " + player.target + " is not in " + hogwartsCastle[roomId].location + ".<br>You have " + (player.targetTurn - player.currentTurn) + " turn left.");

        }
    }

}

//Game complete
function welcomeAddress() {
    hideBoard();
    //DOM roomScene
    console.log( "Room ID: " + this.id );
    var roomScene = document.createElement("div");
    roomScene.id = "roomScene";
    roomScene.classList.add("row");

    //show prof image
    var message1 = document.createElement("div");
    message1.classList.add("col-6");

    var profFound = document.createElement("img");
    profFound.src = hogwartsCastle[this.id].profImg;
    profFound.classList.add("img-fluid");
    profFound.classList.add("rounded");
    message1.appendChild(profFound);
    roomScene.appendChild(message1);

    //show msg
    var message2 = document.createElement("div");
    message2.classList.add("col-6");

    var profName = document.createElement("h3");
    profName.innerHTML = `Professor ${hogwartsCastle[this.id].professor}:`;
    message2.appendChild(profName);

    var profMsg = document.createElement("p");
    profMsg.innerHTML = "Before we begin our banquet, I would like to say a few words.\nAnd here they are: Nitwit! Blubber! Oddment! Tweak! Thank you.";
    message2.appendChild(profMsg);

    //reset game
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.innerHTML = "Use Time-Turner";
    button.addEventListener("click", resetGame);
    message2.appendChild(button);

    roomScene.appendChild(message2);

    var message = document.getElementById("messageBoard");
    message.appendChild(roomScene);

}

//Time-Turner
function resetGame() {
    location.reload();
}
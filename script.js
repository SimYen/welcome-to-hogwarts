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
      founder: "Godric",
      ghost: "Nearly Headless Nick"
    },
    { name: "Hufflepuff",
      head: "Sprout",
      founder: "Helga",
      ghost: "Fat Friar"
    },
    { name: "Ravenclaw",
      head: "Filtwick",
      founder: "Rowena",
      ghost: "Grey Lady"
    },
    { name: "Slytherin",
      head: "Snape",
      founder: "Salazar",
      ghost: "Bloody Baron"
    },
];

//create object of castle rooms
/*
To explore: Rooms as array
DOM room in 3x3 by randomize room selected from array
(have to ensure all rooms DOM and no repeat...)
*/

var hogwartsCastle = [
    // [
    //     { location: "Hufflepuff House",
    //       level: 0,
    //       professor: "Sprout"
    //     },
    //     { location: "Potions Classroom",
    //       level: 0,
    //       professor: "Snape"
    //     },
    //     { location: "Slytherin House",
    //       level: 0,
    //       professor: "Snape"
    //     },
    // ],
    // [
        { location: "Great Hall",
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
        }
    // ],
    // [
    //     { location: "Gryffindor House",
    //       level: 2,
    //       professor: "McGonagall"
    //     },
    //     { location: "Ravenclaw House",
    //       level: 2,
    //       professor: "Filtwick"
    //     },
    //     { location: "Charms Classroom",
    //       level: 2,
    //       professor: "Filtwick"
    //     }
    // ]
];

//DOM gameBoard
function createHogwarts() {
    var castle = document.createElement("div");
    castle.id = "hogwarts";

    //create rooms
    for ( var i = 0; i < hogwartsCastle.length; i++ ) {
        var map = document.createElement("div");
        castle.appendChild(map);

        var room = document.createElement("img");
        room.id = "room" + i;
        room.src = hogwartsCastle[i].roomImg;
        castle.appendChild(room);
    }

    document.body.appendChild(castle);

}


//to track progress of game
var gameCounter = 0;

var gameProgress = [ "getName", "getHouse", "findProfessor" ];

var progressGame = function() {
    gameCounter ++;
    console.log( "Current game stage: " + gameProgress[gameCounter]);
}

//start game by requesting player's name
alert("Welcome to Hogwarts. What's your name?");
input.placeholder = "Enter name";

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
            player.currentLocation = hogwartsCastle[0];
            console.log( "Current location: " + JSON.stringify(player.currentLocation) );

            //initialize turn count
            player.currentTurn = 0;
            console.log("Turn start!")
            //generate target turns to complete task
            //min number of turns is 2
            player.targetTurn = Math.floor(Math.random()*hogwartsCastle.length) + 2;

            //inform player of target & turns
            input.value = "";
            lastInput = "Enter YES to start";
            input.placeholder = lastInput;
            lastOutput = `Please report to Professor ${player.target} of ${player.house.name} House.\nYou have ${player.targetTurn} turns to complete your task.\nYou are now in the Great Hall.`;
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
        hideWelcome.classList.add("hide");

        //create gameBoard
        createHogwarts();

    }
}
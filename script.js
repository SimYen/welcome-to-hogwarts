console.log("welcome to hogwarts");

/*
Welcome to Hogwarts

Ask player which House to be sorted into, after which player needs to find the House Head within Hogwarts Castle.
*/

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

const hogwartsCastle = [
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
          level: 1,
          professor: "Dumbledore"
        },
        { location: "Transfiguration Classroom",
          level: 1,
          professor: "McGonagall"
        },
        { location: "Herbology Classroom",
          level: 1,
          professor: "Sprout"
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
            player.targetTurn = Math.floor(Math.random()*hogwartsCastle.length);

            //inform player of target & turns
            input.value = "";
            lastInput = "Select where you wish to go.";
            input.placeholder = lastInput;
            lastOutput = `Please report to Professor ${player.target} of ${player.house.name} House.\nYou are now in the Great Hall.`;
            return lastOutput;

        //repeat if invalid
        } else {
            input.value = "";
            input.placeholder = lastInput;
            return lastOutput;
        }
        break;

    }
}

//display function
var display = function( data ){
  var displayElement = document.querySelector('#output');

  // get rid of the entire contents
  displayElement.innerHTML = "";

  // put the data into the div
  output.innerText = data;
};
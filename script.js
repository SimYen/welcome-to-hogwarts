console.log("welcome to hogwarts");

/*
Welcome to Hogwarts

Ask player which House to be sorted into, after which player needs to find the House Head within Hogwarts Castle.
*/

//create object to store player details

var player = {
    name: null,
    house: null,
    target: null,
    targetsFound: 0,
    gameProgress: null,
    currentLocation: null,
    currentTurn: null,
    targetTurn: null,
    mode: 0     //0: reveal, 1: flipped
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


//start by crediting copyrights
alert("This game is based on Ⓒ J.K. Rowling's Wizarding World.\nCredit for images used belongs to their illustrators.");

//get player's name
var getName = document.getElementById("input");
getName.addEventListener('change', function(event) {
        var currentInput = event.target.value;
        var result = inputHappened(currentInput)
    });

function inputHappened(currentInput) {

    var hideWelcome = document.getElementById("welcome")
    hideWelcome.classList.add("d-none");

    //store player name
    player.name = currentInput;
    console.log( "Player name: " + player.name );

    //get player House selection
    var showHouses = document.getElementById("getHouse");

    var getHouse = document.getElementById("whatHouse");
    var askHouse = document.createElement("h1")
    askHouse.innerHTML = `Hi, ${player.name}. Which House are you in?`;
    getHouse.appendChild(askHouse);

    //add event listener
    var select = document.getElementsByTagName("button");
    console.log(select);

    for ( var i=0; i<select.length; i++ ) {
        select[i].addEventListener("click", mission);
    }

    showHouses.classList.remove("d-none");

}

//get House of player
function mission() {

    var hideHouse = document.getElementById("getHouse");
    hideHouse.classList.add("d-none")

    player.house = housesOfHogwarts[ this.value ];
    console.log( "Player House: " + JSON.stringify(player.house) );

    //set target to find
    player.target = player.house.head;
    console.log( "Finding: Professor " + player.target );

    //initialize turn count
    player.currentTurn = 0;
    console.log("Turn start!")
    //generate target turns to complete task
    //min number of turns is 2
    player.targetTurn = Math.floor(Math.random()*hogwartsCastle.length/3) + 2;

    //inform player of target & turns
    var gameStart = document.getElementById("gameStart");

    var missionBoard = document.createElement("div");
    missionBoard.classList.add("row");

    //show hat image
    var message1 = document.createElement("div");
    message1.classList.add("col-12");
    message1.classList.add("col-md-6");

    var hat = document.createElement("img");
    hat.src = "image/sorting.jpg";
    hat.classList.add("img-fluid");
    hat.classList.add("rounded");
    message1.appendChild(hat);
    missionBoard.appendChild(message1);

    //show mission
    var message2 = document.createElement("div");
    message2.classList.add("col-12");
    message2.classList.add("col-md-6");

    var hatName = document.createElement("h3");
    hatName.innerHTML = `Sorting Hat:`;
    message2.appendChild(hatName);

    var hatMsg = document.createElement("p");
    hatMsg.innerHTML = `${player.name}, please report to Professor ${player.target} of ${player.house.name} House.<br>You have ${player.targetTurn} turns to do so.`;
    message2.appendChild(hatMsg);

    //start game button
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.innerHTML = "Start";
    button.addEventListener("click", createHogwarts);
    message2.appendChild(button);

    missionBoard.appendChild(message2);

    gameStart.appendChild(missionBoard);

}

//DOM dashboard
function stats() {
    var display = document.getElementById("dashboard");

    var dashBoard = document.createElement("div")
    dashBoard.id = "dashBoard";
    dashBoard.classList.add("row");

    var displayName = document.createElement("div");
    displayName.classList.add("col");
    displayName.innerHTML = `Name:<br>${player.name}`;
    dashBoard.appendChild(displayName);

    var displayHouse = document.createElement("div");
    displayHouse.classList.add("col");
    displayHouse.innerHTML = `House:<br>${player.house.name}`;
    dashBoard.appendChild(displayHouse);

    var displayProf = document.createElement("div");
    displayProf.classList.add("col");
    displayProf.innerHTML = `Now seeking:<br>Professor ${player.target}`;
    dashBoard.appendChild(displayProf);

    var turnLeft = player.targetTurn - player.currentTurn;
    var displayTurn = document.createElement("div");
    displayTurn.classList.add("col");
    displayTurn.innerHTML = `Turns left:<br>${turnLeft}`;
    dashBoard.appendChild(displayTurn)

    var headsFound = document.createElement("div");
    headsFound.classList.add("col");
    headsFound.innerHTML = `Professors Seen:<br>${player.targetsFound}`;
    dashBoard.appendChild(headsFound);

    display.appendChild(dashBoard);
}

//DOM gameBoard
function createHogwarts() {

    var hideMission = document.getElementById("gameStart");
    hideMission.classList.add("d-none");

    stats();

    //gameboard
    var gameBoard = document.getElementById("hogwarts");

    var castle = document.createElement("div");
    castle.id = "hogwartsCastle";
    castle.classList.add("row");

    //create castle div to contain room divs
    for ( var i = 0; i < hogwartsCastle.length; i++ ) {
        var map = document.createElement("div");
        map.classList.add("col-6");
        map.classList.add("col-md-4");

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

    gameBoard.appendChild(castle);

}

//reveal room when clicked
//check if target is found
//else add 1 turn
function revealRoom() {
    console.log(this);
    //show clicked room img
    this.src = hogwartsCastle[this.id].roomImg;

    roomScene(this.id);

}

function hideBoard() {
    var removeCastle = document.getElementById("hogwarts");
    removeCastle.classList.add("d-none");
}

function roomScene( roomId ) {

        hideBoard();
        var message = document.getElementById("messageBoard");

        //DOM roomScene
        console.log( "Room ID: " + roomId );
        var roomScene = document.createElement("div");
        roomScene.id = "roomScene";
        roomScene.classList.add("row");

        //show prof image
        var message1 = document.createElement("div");
        message1.classList.add("col-12");
        message1.classList.add("col-md-6");

        var profFound = document.createElement("img");
        profFound.src = hogwartsCastle[roomId].profImg;
        profFound.classList.add("img-fluid");
        profFound.classList.add("rounded");
        message1.appendChild(profFound);
        roomScene.appendChild(message1);

        //show msg
        var message2 = document.createElement("div");
        message2.classList.add("col-12");
        message2.classList.add("col-md-6");

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

        message.appendChild(roomScene);
}

function returnBoard() {
    var message = document.getElementById("messageBoard");
    //clear messageBoard
    message.innerHTML = "";

    var refreshStats = document.getElementById("dashboard");
    refreshStats.innerHTML = "";
    stats();

    var showCastle = document.getElementById("hogwarts");

    //for flipped mode
    if ( player.mode === 1 && player.targetsFound < housesOfHogwarts.length ) {
        showCastle.innerHTML = "";
        createHogwarts();
    }

    showCastle.classList.remove("d-none");
}

//check what message to show
function statement( roomId ) {

    if ( player.targetsFound >= housesOfHogwarts.length ) {

        return `Please proceed to the Great Hall for the Welcoming Feast.`;

    } else if ( player.target === hogwartsCastle[roomId].professor ) {

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
            console.log(player.target);
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

        player.targetTurn = Math.floor(Math.random()*(hogwartsCastle.length/5))+2;

        player.currentTurn = 0;

        return `Your attendence is noted. Please proceed to report to Professor ${player.target}.<br>You have ${player.targetTurn} turns to complete your task.`;

    } else {

        //increment turns
        player.currentTurn++;

        //check if turns are up
        //implement page reload
        if ( player.currentTurn === player.targetTurn ) {

            setTimeout( timeTurn, 3000 );

            return ("Sorry, you are late reporting to Professor " + player.target + " and missed the Welcome Feast.");

        } else {

            return ("Professor " + player.target + " is not in " + hogwartsCastle[roomId].location + ".<br>You have " + (player.targetTurn - player.currentTurn) + " turn left.");

        }
    }

}

//marauder map
function revealHogwarts() {

    var message = document.getElementById("messageBoard");
    //clear messageBoard
    message.innerHTML = "";

    var revealBoard = document.getElementById("hogwarts");
    revealBoard.innerHTML = "";

    var castle = document.createElement("div");
    castle.id = "hogwartsCastle";
    castle.classList.add("row");

    //create castle div to contain room divs
    for ( var i = 0; i < hogwartsCastle.length; i++ ) {
        var map = document.createElement("div");
        map.classList.add("col-md-4");

        //create display for rooms
        //how to reveal Great Hall from the start?
        var room = document.createElement("img");
        room.id = i;
        room.src = hogwartsCastle[i].roomImg;
        room.classList.add("img-fluid");
        room.classList.add("rounded");
        room.addEventListener("click", revealRoom);  //still use revealRoom?
        map.appendChild(room);

        castle.appendChild(map);
    }

    revealBoard.appendChild(castle);

}

//Game complete
function welcomeAddress() {

    hideBoard();
    //DOM roomScene
    var message = document.getElementById("messageBoard");

    console.log( "Room ID: " + this.id );
    var roomScene = document.createElement("div");
    roomScene.id = "roomScene";
    roomScene.classList.add("row");

    //show prof image
    var message1 = document.createElement("div");
    message1.classList.add("col-12");
    message1.classList.add("col-md-6");

    var profFound = document.createElement("img");
    profFound.src = hogwartsCastle[this.id].profImg;
    profFound.classList.add("img-fluid");
    profFound.classList.add("rounded");
    message1.appendChild(profFound);
    roomScene.appendChild(message1);

    //show msg
    var message2 = document.createElement("div");
    message2.classList.add("col-12");
    message2.classList.add("col-md-6");

    var profName = document.createElement("h3");
    profName.innerHTML = `Professor ${hogwartsCastle[this.id].professor}:`;
    message2.appendChild(profName);

    var profMsg = document.createElement("p");
    profMsg.innerHTML = "Before we begin our banquet, I would like to say a few words.<br>And here they are: Nitwit! Blubber! Oddment! Tweak!<br>Thank you.";
    message2.appendChild(profMsg);

    //reset game
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.innerHTML = "Relive This Day";
    button.addEventListener("click", timeTurn);
    message2.appendChild(button);

    roomScene.appendChild(message2);

    message.appendChild(roomScene);

}

//Time-Turner
function timeTurn() {

    hideBoard();
    //DOM roomScene
    var message = document.getElementById("messageBoard");
    //clear messageBoard
    message.innerHTML = "";

    //endScene
    var roomScene = document.createElement("div");
    roomScene.id = "roomScene";
    roomScene.classList.add("row");

    //show time-turner
    var message1 = document.createElement("div");
    message1.classList.add("col-12");
    message1.classList.add("col-md-6");

    var timeTurner = document.createElement("img");
    timeTurner.src = "image/timeturner.jpg";
    timeTurner.classList.add("img-fluid");
    timeTurner.classList.add("rounded");
    message1.appendChild(timeTurner);
    roomScene.appendChild(message1);

    //show msg
    var message2 = document.createElement("div");
    message2.classList.add("col-12");
    message2.classList.add("col-md-6");

    var itemName = document.createElement("h3");
    itemName.innerHTML = `Time-Turner`;
    message2.appendChild(itemName);

    var itemMsg = document.createElement("p");
    itemMsg.innerHTML = "I mark the hours, every one,<br>Nor have I yet outrun the Sun.<br>My use and value, unto you,<br>Are gauged by what you have to do.";
    message2.appendChild(itemMsg);

    //reset game
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.innerHTML = "Use Time-Turner";
    button.addEventListener("click", resetGame);
    message2.appendChild(button);

    roomScene.appendChild(message2);

    message.appendChild(roomScene);

}

function resetGame() {
    location.reload();
}
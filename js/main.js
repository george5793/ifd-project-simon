var game = {

    count: 0,
    possibilities: ['#red', '#blue', '#yellow', '#green'],
    currentGame: [],
    player: []
};

var scoresArray = [];

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

function init() {
    if (localStorage.scoresRecord) {
        
        scoresArray = JSON.parse(localStorage.scoresRecord);
        
        for (var i = 0; i < scoresArray.length; i++) {
            
            showHighScores(scoresArray[i].name, scoresArray[i].score, scoresArray[i].date);
        }
    }
}

function newGame() {

    clearGame();
}

function clearGame() {

    game.currentGame = [];
    game.count = 0;
    addCount();
}

function addCount() {

    game.count++;
    $('#level-number').addClass('animated flash');

    setTimeout(function() {
        $('#level-number').removeClass('flash').html('<h3>' + game.count + '</h3>');
    }, 200);

    generateMove();
}

function generateMove() {

    game.currentGame.push(game.possibilities[Math.floor(Math.random() * 4)]);

    showMoves();
}

function showMoves() {

    var i = 0;
    var moves = setInterval(function() {

        playGame(game.currentGame[i]);
        i++;

        if (i >= game.currentGame.length) {
            clearInterval(moves);
        }

    }, 600);

    clearPlayer();
}

function clearPlayer() {

    game.player = [];
}

function playGame(field) {

    $(field).addClass('hvr-border-fade');
    setTimeout(function() {
        $(field).removeClass('hvr-border-fade');
    }, 300);
}

function addToPlayer(id) {

    var field = "#" + id;
    console.log(field);
    game.player.push(field);
    playerTurn();
}

function playerTurn() {

    if (game.currentGame.length == game.player.length) {
        if (game.player[game.player.length - 1] !== game.currentGame[game.currentGame.length - 1]) {

            alert('Wrong move! Game over!');
            logScore();
            newGame();
        }

        else {

            console.log('Good move!');

            var check = game.player.length === game.currentGame.length;

            if (check) {

                if (game.count == 20) {

                    alert('You won! Congratulations on beating the computer.');
                    logScore();
                }

                else {

                    alert('Next round!');
                    nextLevel();
                }
            }
        }
    }
}


function nextLevel() {

    addCount();
}



function logScore() {

    var name = prompt("Please enter your name to add to the high scores list:");
    
    var score = game.count;
    
    var gameDate = today;

    var scoreObj = { name: name, score: score, date: gameDate };

    scoresArray.push(scoreObj);
    window.localStorage.setItem('scoresRecord', JSON.stringify(scoresArray));
}

    
function showHighScores(name, score, gameDate) {
    
    var table = document.getElementById("score-table");
    var row = table.insertRow();
    var nameCell = row.insertCell(0);
    var scoreCell = row.insertCell(1);
    var dateCell = row.insertCell(2);

    nameCell.innerHTML = name;
    scoreCell.innerHTML = score;
    dateCell.innerHTML = gameDate;
}
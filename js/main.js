var game = {

    count: 0,
    possibilities: ['#red', '#blue', '#yellow', '#green'],
    currentGame: [],
    player: [],
    name: []
};


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
        $('#level-number').removeClass('flash').html('<h2>' + game.count + '</h2>');
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

            logScore(game.count);
            alert('Wrong move! Start again...');
            newGame();
        }

        else {

            console.log('Good move!');

            var check = game.player.length === game.currentGame.length;

            if (check) {

                if (game.count == 10) {

                    logScore(game.count);
                    alert('You won! Congratulations on beating the computer');
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

function logScore(score) {
    highScore.push({ "score": score });
    console.log(highScore);
    console.log(game);
}

function enterName() {

    var name = prompt("Please enter your name below to start the game:");

    if (name != null) {

        game.name.push(name);
    }
    
    newGame();

}

var highScore = [];

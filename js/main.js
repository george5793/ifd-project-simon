var game = {

    count: 0,
    possibilities: ['#red', '#blue', '#yellow', '#green'],
    currentGame: [],
    player: []

};

function clearGame() {

    game.currentGame = [];
    game.count = 0;
    addCount();
}

function newGame() {
    
    clearGame();
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

function playGame(field) {
    
    $(field).addClass('hvr-border-fade');
    setTimeout(function() {
        $(field).removeClass('hvr-border-fade');
    }, 300);
}

function clearPlayer() {
    
    game.player = [];
}

function addToPlayer(id) {
    
    var field = "#" + id;
    console.log(field);
    game.player.push(field);
    playerTurn();
}

function playerTurn() {
    
    if (game.player[game.player.length-1] !== game.currentGame[game.currentGame.length-1]) {
        
        alert('Wrong move! Try again');
        showMoves();
    }
    
    else {
        
        console.log('Good move!');
        
        var check = game.player.length === game.currentGame.length;
        
        if (check) {
            
            if (game.count == 5) {
                alert('You won! Congratulations for beating the computer');
            }
            
            else {
                
                alert('Next round!');
                nextLevel();
            }
        }
    }
}


function nextLevel() {
    
    addCount();
}

function generateMove() {
    
    game.currentGame.push(game.possibilities[Math.floor(Math.random()*4)]);
    
    showMoves();
}

function addCount() {
   
    game.count++;
        $('#level-number').addClass('animated flash');

    setTimeout(function() {
        $('#level-number').removeClass('flash').html('<h2>' + game.count + '</h2>');
    }, 200);
    
    generateMove();
}
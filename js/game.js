var game = {

    count: 0,
    possibilities: ['#red', '#blue', '#yellow', '#green'],
    player: [],
    computer: []
};

$('#play-button').on("click", function() {

    game.count++;

    $('#level-number').html('<h2>' + game.count + '</h2>');
    
    generateCompMove();
});

function generateCompMove() {
    
    game.computer.push(game.possibilities[Math.floor(Math.random()*4)]);
    
    showMoves();
}

function showMoves() {
        var i = 0;
        var moves = setInterval(function() {
            
            playGame(game.computer[i]);
            i++;
            
            if (i >= game.computer.length) {
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
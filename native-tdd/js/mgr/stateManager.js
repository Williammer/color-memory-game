var Board = function(opts) {
    var row = (opts !== undefined && opts.row > 0) ? opts.row : 4,
        col = (opts !== undefined && opts.col > 0) ? opts.col : 4;

    // internal properties.
    this.row = row;
    this.col = col;
};

Board.prototype.shuffle = function(cardsArray) {
    for (var j, x, i = cardsArray.length; i; j = Math.floor(Math.random() * i), x = cardsArray[--i], cardsArray[i] = cardsArray[j], cardsArray[j] = x);
    return cardsArray;
};

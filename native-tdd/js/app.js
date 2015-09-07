(function(app){

	var board = new app.Board(4, 4),
		scoreKeeper = new app.Score();

	scoreKeeper.init();
	board.init();

})(window.app);
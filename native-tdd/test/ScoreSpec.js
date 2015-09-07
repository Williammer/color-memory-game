// [O] Score module
describe("#Score test", function() {
    var scoreKeeper,
        scoreKeeperInit2,
        app = window.app;

    beforeEach(function() {
        scoreKeeperInit2 = new app.Score({score: 2});
        scoreKeeper = new app.Score();
    });

    it("should have default score 0 ", function() {
        var score = scoreKeeper.getScore();

        expect(score).toEqual(0);
    });

    it("should be able to init score value on contructor", function() {
        var score = scoreKeeperInit2.getScore();

        expect(score).toEqual(2);
    });

    it("should remain default value with invalid input", function() {
        var scoreKeeperInvalid = new app.Score({score: "xxw"});
        var score = scoreKeeperInvalid.getScore();

        expect(score).toEqual(0);
    });

    it("should be able to update score by a value", function() {
        scoreKeeper.updateScoreBy(2);
        var score = scoreKeeper.getScore();

        expect(score).toEqual(2);
    });

});

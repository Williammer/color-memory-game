(function(app) {
    app.Score = function(opts) {
        var score = 0;
        if (opts !== undefined) {
            if (typeof opts.score === "number") {
                score = opts.score;
            } else {
                console.warn("Invalid Input.");
            }
        }

        // internal properties.
        this._score = score;

        this.SCORE_POINT = 1;

        this._firstCardIdHolder = null;
    };

    app.Score.prototype = {
        init: function() {
            app.observer.subscribe("flipCard", this.judgeMatch, this);
            this.render();
        },
        getScore: function() {
            return this._score;
        },
        updateScoreBy: function(value) {
            if (typeof value === "number") {
                var addValue = value + this._score;
                this.updateScoreTo(addValue);
            }
        },
        updateScoreTo: function(value) {
            if (typeof value === "number") {
                this._score = value;
                this.render();
            }
        },
        judgeMatch: function(cardIdObj) {
            if (this._firstCardIdHolder === null) {
                this._firstCardIdHolder = cardIdObj;
                return;

            } else {
                if (this._firstCardIdHolder.id === cardIdObj.id && this._firstCardIdHolder.colorNum === cardIdObj.colorNum) {
                    return;
                }
                var cardPairIdArr = [this._firstCardIdHolder.id, cardIdObj.id];
                // judge match
                if (this._firstCardIdHolder.colorNum === cardIdObj.colorNum) {
                    if (app.observer && typeof app.observer.publish === 'function') {
                        app.observer.publish("cardMatch", cardPairIdArr);
                    }
                    this.updateScoreBy(this.SCORE_POINT);
                } else {
                    if (app.observer && typeof app.observer.publish === 'function') {
                        app.observer.publish("cardNotMatch", cardPairIdArr);
                    }
                    this.updateScoreBy(-this.SCORE_POINT);
                }
                // resume holder
                this._firstCardIdHolder = null;
            }
        },
        render: function() {
            var scoreLabel = document.getElementById('score_label');
            scoreLabel.textContent = this.getScore();
        },


    };
})(window.app);

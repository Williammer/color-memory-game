(function(app) {
    app.Board = function(opts) {
        var row = (opts !== undefined && opts.row > 0) ? opts.row : 4,
            col = (opts !== undefined && opts.col > 0) ? opts.col : 4;

        // internal properties.
        this.row = row;
        this.col = col;

        this._cardElementList = [];
    };

    app.Board.prototype = {
        init: function() {
            this.prepareCardElementList();
            this.render();

            app.observer.subscribe("cardMatch", this.updateMatchedCards, this);
            app.observer.subscribe("cardNotMatch", this.resumeNotMatchedCards, this);

            this.addEventListener("keydown", this._keyHandler);
        },

        getInitCardList: function() {
            return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
            // TODO: generate cardlist base on row/col
        },

        getShuffledCardList: function() {
            var cardsArray = this.getInitCardList();
            for (var j, x, i = cardsArray.length; i; j = Math.floor(Math.random() * i), x = cardsArray[--i], cardsArray[i] = cardsArray[j], cardsArray[j] = x);
            return cardsArray;
        },

        prepareCardElementList: function() {
            var cardsArray = this.getShuffledCardList(),
                cardComp, colorNum;

            for (var i = 0; i <= cardsArray.length - 1; i++) {
                colorNum = cardsArray[i];

                cardComp = new app.Card(colorNum);
                cardComp.setId(i);

                this._cardElementList[i] = cardComp;
            };
        },

        getCardElementList: function() {
            return this._cardElementList;
        },

        resumeNotMatchedCards: function(cardPairIds) {
            if (!cardPairIds || !cardPairIds.length || cardPairIds.length !== 2) {
                return;
            }
            var cardElementList = this.getCardElementList();
            cardElementList[cardPairIds[0]].resume();
            cardElementList[cardPairIds[1]].resume();
        },

        updateMatchedCards: function(cardPairIds) {
            if (!cardPairIds || !cardPairIds.length || cardPairIds.length !== 2) {
                return;
            }
            var cardElementList = this.getCardElementList();
            cardElementList[cardPairIds[0]].match();
            cardElementList[cardPairIds[1]].match();
        },

        render: function() {
            var boardWrap = document.getElementById('game_board'),
                cardElementList = this.getCardElementList(),
                len = cardElementList.length,
                cardElement;

            for (var i = 0; i <= len - 1; i++) {
                cardElement = cardElementList[i].getDOMElement();
                boardWrap.appendChild(cardElement);
            };
        },

        _keyHandler: function(evt) {
            switch (evt.keyCode) {
                case 37:
                 // left key pressed
                var curFocusCard = document.querySelector(".on_focus");
                //find left sibling
                break;        
                
                case 38:
                // up key pressed
                break;        

                case 39:
                // right key pressed
                break;   
                    
                case 40:
                // down key pressed
                break; 

                default:
                    console.log("evt.keyCode pressed: " + evt.keyCode);
                break;
            }
        }
    };
})(app);

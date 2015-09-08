(function(app) {
    app.Card = function(colorNum) {
        // internal properties.
        this._colorNum = colorNum > 0 ? "color-" + colorNum : "color-" + 1;

        this.stateMap = {
            INACTIVE: 0,
            FLIPPED: 1,
            MATCHED: 2
        };

        this.stateClassMap = ['idle', 'flip', 'frozen'];

        this._currentState = this.stateMap.INACTIVE;
        this._cardEle = document.createElement('div');

        this._initized = false;
    };

    app.Card.prototype = {
        setId: function(id) {
            if (!id) {
                return;
            }

            this._cardEle.id = id;
        },

        getId: function() {
            return this._cardEle.id;
        },

        getColorNum: function() {
            return this._colorNum;
        },

        getState: function() {
            return this._currentState;
        },

        setState: function(newState) {
            // TODO: use early return for different condition, add info logs.
            if (typeof newState === "number" && newState >= this.stateMap.INACTIVE && newState <= this.stateMap.MATCHED && newState !== this._currentState) {
                this._currentState = newState;
                // view update

                this.updateEleStateClass();
            }

            return;
        },

        resume: function() {
            this.setState(this.stateMap.INACTIVE);
        },

        flip: function() {
            if (this.getState() === this.stateMap.FLIPPED || this.getState() === this.stateMap.MATCHED) {
                return;
            }

            this.setState(this.stateMap.FLIPPED);
            // notify the flip event
            if (app.observer && typeof app.observer.publish === 'function') {
                app.observer.publish("flipCard", {
                    id: this.getId(), 
                    colorNum: this.getColorNum()
                });
            }
        },

        match: function() {
            this.setState(this.stateMap.MATCHED);
        },

        updateEleStateClass: function() {
            var curState = this.getState(),
                stateClass = this.stateClassMap[curState];

            if (this._cardEle.className.indexOf(stateClass) === -1) {
                var stateClassLen = this.stateClassMap.length;

                for (var i = 0; i <= stateClassLen; i++) {
                    if (i !== curState && this._cardEle.className.indexOf(this.stateClassMap[i]) > -1) {
                        this._cardEle.className = this._cardEle.className.replace(this.stateClassMap[i], stateClass);
                        return;
                    }
                };
            }
        },

        initDOMElement: function() {
            if (this._initized) {
                return;
            }

            var stateClass = this.stateClassMap[this.getState()];
            this._cardEle.className = 'card ' + this._colorNum + ' ' + stateClass;

            this._cardEle.addEventListener('mouseover', function(evt){
                this.className += ' on_focus';
            });

            this._cardEle.addEventListener('mouseout', function(evt){
                var idx = this.className.indexOf(' on_focus');
                if (idx === -1) {
                    return;
                }
                this.className = this.className.substr(0, idx);
                // tdo: on_foucs not last condition
            });

            this._cardEle.addEventListener('click', this.flip.bind(this) );

            this._initized = true;
        },

        getDOMElement: function() {
            this.initDOMElement();

            return this._cardEle;
        }
    };
})(window.app);

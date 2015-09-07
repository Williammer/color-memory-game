    // [O] Card module
    describe("#Card test", function() {
        var cardWithId4,
            cardNoId,
            app = window.app;
            
        beforeEach(function() {
            console.log("1. beforeEach re-init cards.");

            cardNoId = new app.Card();
            cardWithId4 =  new app.Card(4);
        });

        it("should return _colorNum by getColorNum method", function() {
            expect(cardWithId4._colorNum).toEqual(cardWithId4.getColorNum());
        });

        it("should have id of 'color-id' format on card when initiated with given id", function() {
            var id = cardWithId4.getColorNum();

            expect(id).toEqual("color-4");
        });

        it("should have default value of 1 if given no id when initiated", function() {
            var id = cardNoId.getColorNum();

            expect(id).toEqual("color-1");
        });

        it("should have correct state mapping: INACTIVE: 0, FLIPED: 1, MATCHED: 2", function() {
            var stateMap = cardWithId4.stateMap;

            expect(stateMap.INACTIVE).toEqual(0);
            expect(stateMap.FLIPPED).toEqual(1);
            expect(stateMap.MATCHED).toEqual(2);
        });

        it("should have default state of 0", function() {
            var defaultState = cardWithId4.getState();

            expect(defaultState).toEqual(0);
        });

        it("should be able to change state", function() {
            cardWithId4.setState(2);
            var newState = cardWithId4.getState();

            expect(newState).toEqual(2);
        });

        it("should not change to invalid state type", function() {
            cardWithId4.setState("xx");
            var newState = cardWithId4.getState();

            expect(newState).toEqual(0);
        });

        it("should not change to invalid state num", function() {
            cardWithId4.setState(999);
            var newState = cardWithId4.getState();

            expect(newState).toEqual(0);
        });

        it("resume should be able to change to corresponding state", function() {
            cardWithId4.resume();
            var newState = cardWithId4.getState();

            expect(newState).toEqual(0);
        });

        it("flip should be able to change to corresponding state", function() {
            cardWithId4.flip();
            var newState = cardWithId4.getState();

            expect(newState).toEqual(1);
        });

        it("match should be able to change to corresponding state", function() {
            cardWithId4.match();
            var newState = cardWithId4.getState();

            expect(newState).toEqual(2);
        });

        it("should return the right card dom element", function() {
            var cardId4Ele = cardWithId4.getDOMElement(),
                id4 = cardWithId4.getColorNum(),
                eleClass = cardId4Ele.className;
                
            expect(this.isDOMElement(cardId4Ele)).toBe(true);
            expect(eleClass.indexOf(id4) > -1).toBe(true);
        });

    });
    // [O] Card module
    describe("#Card test", function() {
        var cardWithId4 = new Card(4),
            cardNoId = new Card();
            
        beforeEach(function() {
            
        });

        it("should return _id by getId method", function() {
            expect(cardWithId4._id).toEqual(cardWithId4.getId());
        });

        it("should return _isFocused state by isFocused method", function() {
            expect(cardWithId4._isFocused).toEqual(cardWithId4.isFocused());
        });

        it("should return _isMatched state by isMatched method", function() {
            expect(cardWithId4._isMatched).toEqual(cardWithId4.isMatched());
        });

        it("should have id of 'color-id' format on card when initiated with given id", function() {
            expect(cardWithId4.getId()).toEqual("color-4");
        });

        it("should have default value of 1 if given no id when initiated", function() {
            expect(cardNoId.getId()).toEqual("color-1");
        });

        it("should have default focus state of false", function() {
            expect(cardNoId.isFocused()).toEqual(false);
        });

        it("should change state to focused by focus method", function() {
            cardNoId.focus();
            expect(cardNoId.isFocused()).toEqual(true);
        });

        it("should change state to not focused by blur method", function() {
            cardNoId.blur();
            expect(cardNoId.isFocused()).toEqual(false);
        });

        it("should have default match state of false", function() {
            expect(cardNoId.isMatched()).toEqual(false);
        });

        it("should change state to matched by match method", function() {
            cardNoId.match();
            expect(cardNoId.isMatched()).toEqual(true);
        });

        it("should change state to not matched by mismatch method", function() {
            cardNoId.mismatch();
            expect(cardNoId.isMatched()).toEqual(false);
        });

        // it("should have focused style in focused state", function() {
        //     // ? how to unit test css style change ?
        // });

        // it("should allow me to flip the card by click or key-enter", function() {

        // });
    });
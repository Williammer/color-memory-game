// [O] Board module
describe("#Board test", function() {
    var board,
        cardList,
        app = window.app;

    beforeEach(function() {
        // 16 cards in this case
        board = new app.Board(4, 4);
        cardlist = board.getInitCardList();
    });

    it("should have 16 cards in this case", function() {
        expect(cardlist.length).toEqual(16);
    });

    it("should have 8 pairs of cards squenced by id from 1 to 8", function() {
        expect(cardlist[0]).toEqual(1);
        expect(cardlist[1]).toEqual(1);
        expect(cardlist[2]).toEqual(2);
        expect(cardlist[3]).toEqual(2);
        expect(cardlist[4]).toEqual(3);
        expect(cardlist[5]).toEqual(3);
        expect(cardlist[6]).toEqual(4);
        expect(cardlist[7]).toEqual(4);
        expect(cardlist[8]).toEqual(5);
        expect(cardlist[9]).toEqual(5);
        expect(cardlist[10]).toEqual(6);
        expect(cardlist[11]).toEqual(6);
        expect(cardlist[12]).toEqual(7);
        expect(cardlist[13]).toEqual(7);
        expect(cardlist[14]).toEqual(8);
        expect(cardlist[15]).toEqual(8);
    });

    it("should be able to shuffle cardList", function() {
        var shuffledList1 = board.getShuffledCardList();
        var shuffledList2 = board.getShuffledCardList();
        var shuffledList3 = board.getShuffledCardList();
        var shuffledList4 = board.getShuffledCardList();
        var shuffledList5 = board.getShuffledCardList();

        // console.log(shuffledList1);
        // console.log(shuffledList2);
        // console.log(shuffledList3);
        // console.log(shuffledList4);
        // console.log(shuffledList5);
        expect(this.arrayEqual(shuffledList1, shuffledList2)).toBe(false);
        expect(this.arrayEqual(shuffledList1, shuffledList3)).toBe(false);
        expect(this.arrayEqual(shuffledList1, shuffledList4)).toBe(false);
        expect(this.arrayEqual(shuffledList1, shuffledList5)).toBe(false);
        expect(this.arrayEqual(shuffledList2, shuffledList3)).toBe(false);
        expect(this.arrayEqual(shuffledList2, shuffledList4)).toBe(false);
        expect(this.arrayEqual(shuffledList2, shuffledList5)).toBe(false);
        expect(this.arrayEqual(shuffledList3, shuffledList5)).toBe(false);
        expect(this.arrayEqual(shuffledList3, shuffledList4)).toBe(false);
        expect(this.arrayEqual(shuffledList5, shuffledList4)).toBe(false);
        // TODO: a challenge: test randomness
        // --> mock/stub ?
    });

    it("should be able to get the right cardElementList", function() {
        var cardElementList = board.getCardElementList();
        var len = cardElementList.length;
        while(len > 0){
            len--;
            expect(this.isDOMElement(cardElementList[len])).toBe(true);
        };
    });

});
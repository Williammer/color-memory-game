// setup for all tests.
beforeEach(function() {
	
    this.isDOMElement = function(obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrom)
            return obj instanceof HTMLElement;
        } catch (e) {
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have. (works on IE7)
            return (typeof obj === "object") &&
                (obj.nodeType === 1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument === "object");
        }
    };

    this.arrayEqual = function(array1, array2) {
        if (Object.prototype.toString.call(array1) === '[object Array]' && Object.prototype.toString.call(array2) === '[object Array]') {
            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = array1.length - 1; i >= 0; i--) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            };

            return true;
        }
    };
});

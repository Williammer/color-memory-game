var app = {
    observer: {
        _eventList: {},
        subscribe: function(event, handler, context) {
            if (typeof event === 'string' && typeof handler === 'function') {
                this._eventList[event] = {
                    context: context,
                    handler: handler
                }
            }
        },
        publish: function(event, args) {
            if (typeof event === 'string' && typeof this._eventList[event].handler === 'function') {
                var context = this._eventList[event].context;
                this._eventList[event].handler.call(context, args);
            }
        },
        clear: function() {
            this._eventList = {};
        }
    }
};
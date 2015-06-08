var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StockrAppDispatcher = require('../dispatcher/StockrAppDispatcher');
var ActionTypes = require('../constants/SharesConstants').ActionTypes;
var _ = require('lodash');

var _shares = [{
    symbol: 'AAPL',
    amount: 1
}];
var CHANGE_EVENT = 'CHANGE';

function buyShare(symbol) {
    let symbol = _.findWhere(_shares, {symbol: symbol});

    if (symbol) {
        symbol.amount ++;
    } else {
        _shares.push({
            symbol: symbol,
            amount: 1
        });
    }
}

function sellShare(symbol) {
    let symbol = _.findWhere(_shares, {symbol: symbol});

    if (symbol && symbol.amount > 0) {
        symbol.amount --;
    }
}

var SharesStore = assign({}, EventEmitter.prototype, {

    getShares: function() {
        return _shares;
    },

    getTotalShares: function() {
        return _shares.map(share => share.amount)
                      .reduce( (x, y) => x += y, 0);
    },
    getStockShares: function(symbol) {
      return _shares.filter(share => share.symbol === symbol)
                    .map(share => share.amount)
                    .reduce( (x,y) => x += y, 0);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

SharesStore.dispatchToken = StockrAppDispatcher.register(function(action) {

    switch(action.type) {
        case ActionTypes.BUY_SHARE:
            buyShare(action.symbol);
            SharesStore.emitChange();
            break;

        case ActionTypes.SELL_SHARE:
            sellShare(action.symbol);
            SharesStore.emitChange();
            break;
    }

});

module.exports = SharesStore;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/StockConstants').ActionTypes;
var StockrAppDispatcher = require('../dispatcher/StockrAppDispatcher');


var _stocks = [], _symbols = ['AAPL', 'MSFT'];
var CHANGE_EVENT = 'CHANGE';

var serviceUrl = 'http://query.yahooapis.com/v1/public/yql';

/**
 * Build a query to get stock quotes from YQL
 * @param symbols - an array of stock symbols
 * @returns {string}
 */
function buildQuery(symbols) {
    symbols = JSON.stringify(symbols).replace(/\[|]/g, '');
    return serviceUrl + '?q=' + encodeURIComponent('select * from yahoo.finance.quotes where symbol in (' + symbols + ')') + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
}

function processData(data) {
    if (!data) {
        return;
    }

    return data.query.results.quote.map(function(item) {
        return {
            change: item.Change,
            changeInPercent: item.ChangeinPercent,
            stockExchange: item.StockExchange,
            symbol: item.Symbol,
            name: item.Name,
            lastTradeTime: item.LastTradeTime,
            price: parseFloat(item.LastTradePriceOnly)
        }
    });
}

function loadStocks() {
    fetch(buildQuery(_symbols))
        .then(response => response.json())
        .then(function(stocks) {
            _stocks = processData(stocks);
            StockStore.emitChange();

            return true;
        });
}

function addStock(symbol) {
    _symbols.push(symbol);
}

function removeStock(symbol) {
    _symbols.splice(_symbols.indexOf(symbol), 1);
}

var StockStore = assign({}, EventEmitter.prototype, {

    getStocks: function() {
        return _stocks;
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

StockStore.dispatchToken = StockrAppDispatcher.register(function(action) {

    switch(action.type) {
        case ActionTypes.ADD_STOCK:
            addStock(action.symbol);
            StockStore.emitChange();
            break;

        case ActionTypes.REMOVE_STOCK:
            removeStock(action.symbol);
            StockStore.emitChange();
            break;

        case ActionTypes.UPDATE_STOCKS:
            loadStocks();
            break;
    }

});

module.exports = StockStore;
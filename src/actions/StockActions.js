var StockAppDispatcher = require('../dispatcher/StockrAppDispatcher');
var ActionTypes = require('../constants/StockConstants').ActionTypes;

module.exports = {

    AddStock: function(symbol) {
        StockAppDispatcher.dispatch({
            type: ActionTypes.ADD_STOCK,
            symbol: symbol
        });
    },

    RemoveStock: function(symbol) {
        StockAppDispatcher.dispatch({
            type: ActionTypes.REMOVE_STOCK,
            symbol: symbol
        });
    },

    UpdateStocks: function() {
        StockAppDispatcher.dispatch({
            type: ActionTypes.UPDATE_STOCKS
        });
    }

};

var StockAppDispatcher = require('../dispatcher/StockrAppDispatcher');
var ActionTypes = require('../constants/SharesConstants').ActionTypes;

module.exports = {

    BuyShare: function(symbol) {
        StockAppDispatcher.dispatch({
            type: ActionTypes.BUY_SHARE,
            symbol: symbol
        });
    },

    SellShare: function(symbol) {
        StockAppDispatcher.dispatch({
            type: ActionTypes.SELL_SHARE,
            symbol: symbol
        });
    }

};

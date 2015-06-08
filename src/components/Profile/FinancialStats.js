var React = require('react');
var SharesStore = require('../../stores/SharesStore');
var StocksStore = require('../../stores/StockStore');
var _ = require('lodash');

function getNetWorth() {
    let shares = SharesStore.getShares();
    let stocks = StocksStore.getStocks();
    let result = 0;

    shares.forEach(function(share) {
       let stock = _.findWhere(stocks, {symbol: share.symbol});
        if (stock) {
            result = share.amount * stock.price
        }
    });

    return result;
}

var FinancialStats = React.createClass({
    getInitialState: function () {
        return {
            totalShares: SharesStore.getTotalShares(),
            netWorth: getNetWorth()
        }
    },
    componentDidMount: function() {
        SharesStore.addChangeListener(this._onChange);
        StocksStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        SharesStore.removeChangeListener(this._onChange);
        StocksStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState({
          totalShares: SharesStore.getTotalShares(),
          netWorth: getNetWorth()
      });
    },
    render: function () {
        return (
            <ul>
                <li>Net Worth: ${this.state.netWorth.toFixed(2)}</li>
                <li>Balance: $0</li>
                <li>Total Shares: {this.state.totalShares}</li>
            </ul>
        )
    }
});

module.exports = FinancialStats;
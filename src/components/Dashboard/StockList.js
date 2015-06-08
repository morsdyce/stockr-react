var React = require('react');
var StockItem = require('./StockItem');
var _ = require('lodash');

var StockList = React.createClass({
    render: function() {

        let stocks = this.props.data;

        if (this.props.filter) {
            stocks = stocks.filter(stock => stock.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1 || stock.symbol.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1 )
        }

        var stockItems = stocks.map(function(stock) {
            return (
                <StockItem data={stock} key={stock.symbol} />
            )
        });

        return (
            <div className="content-box">
            {stockItems}
            </div>
        )
    }
});

module.exports = StockList;
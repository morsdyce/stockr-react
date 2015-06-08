var React = require('react/addons');

var FlatButton = require('material-ui/lib/flat-button');
var SharesActions = require('../../actions/SharesActions');
var SharesStore = require('../../stores/SharesStore');

var StockItem = React.createClass({
    getInitialState: function () {
        return {
            shares: SharesStore.getStockShares(this.props.data.symbol)
        }
    },
    componentDidMount: function () {
        SharesStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        SharesStore.removeChangeListener(this._onChange);
    },
    buy: function () {
        SharesActions.BuyShare(this.props.data.symbol);
    },
    sell: function () {
        SharesActions.SellShare(this.props.data.symbol);
    },
    _onChange: function() {
      this.setState({
          shares: SharesStore.getStockShares(this.props.data.symbol)
      });
    },
    render: function () {
        let isPositive = this.props.data.change.indexOf('-') === -1;
        let changeClass = React.addons.classSet({
            "stock-change": true,
            red: !isPositive,
            green: isPositive
        });
        return (
            <div className="stock-box">
                <div className="stock-details">
                    <p className="stock-company-name">{this.props.data.name}</p>
                    <p className="stock-extra-details">
                        <span>{this.props.data.stockExchange} </span>
                        <span>{this.props.data.symbol} </span>
                        <span>{this.props.data.lastTradeTime} </span>
                    </p>
                    <p>
                        <span className="stock-price">{this.props.data.price} </span>
                        <span className={changeClass}>{this.props.data.change} </span>
                    </p>
                    <p className="stock-shares">
                        {this.state.shares} Shares
                    </p>
                </div>
                <div className="stock-actions">
                    <FlatButton label="BUY" primary={true} onClick={this.buy} />
                    <FlatButton label="SELL" primary={false} onClick={this.sell} />
                </div>
            </div>

        )
    }
});

module.exports = StockItem;
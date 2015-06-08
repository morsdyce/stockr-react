var React = require('react');
var StockList = require('./StockList');
var TextField = require('material-ui/lib/text-field');
var StockStore = require('../../stores/StockStore');
var StockActions = require('../../actions/StockActions');

function getStateFromStockStore() {
    return {
        stocks: StockStore.getStocks(),
        searchTerm: ''
    }
}

var Stocks = React.createClass({
    getInitialState: function () {
        return getStateFromStockStore();
    },
    componentWillMount: function() {
        StockActions.UpdateStocks();
    },
    componentDidMount: function() {
        StockStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        StockStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getStateFromStockStore());
    },
    searchChanged: function() {
        this.setState({
            searchTerm: this.refs.search.getValue()
        });
    },
    render: function () {
        var style = {
            width: '80%',
            margin: '0 20px',
            padding: '0 25px'
        };
        return (
            <div className="viewport">
                <TextField
                    floatingLabelText="Search"
                    className="full-width"
                    style={style}
                    onChange={this.searchChanged}
                    ref="search"
                />
                <StockList data={this.state.stocks} filter={this.state.searchTerm} />
            </div>
        )
    }
});

module.exports = Stocks;
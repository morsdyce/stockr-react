'use strict';

var React = require('react/addons');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');
var AppBar = require('material-ui/lib/app-bar');
var ProfileBar = require('./Profile/ProfileBar');
var Stocks = require('./Dashboard/Stocks');
var FloatingActionsMenu = require('./common/FloatingActionsMenu');


var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

// CSS
require('normalize.css');
require('../styles/main.scss');

var StockrApp = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    componentWillMount: function() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    },

    render: function() {
    return (
      <div className='main'>
          <AppBar title='Stockr' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          <ProfileBar />
          <Stocks />
      </div>
    );
  }
});
React.render(<StockrApp />, document.getElementById('content')); // jshint ignore:line

module.exports = StockrApp;

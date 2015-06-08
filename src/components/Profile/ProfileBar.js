var React = require('react');
var Paper = require('material-ui/lib/paper');
var FinancialStats = require('./FinancialStats');

let userImage = require('../../images/user.jpg');

var ProfileBar = React.createClass({
    render: function() {
        return (
            <Paper zDepth={1} className="sidebar">
                <div className="user-image">
                    <img src={userImage} />
                </div>
                <FinancialStats />
            </Paper>
        )
    }
});

module.exports = ProfileBar;
var React = require('react');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var FontIcon = require('material-ui/lib/font-icon');

var FloatingActionsMenu = React.createClass({
    render: function() {
        return (
            <div>
                <FloatingActionButton label="Primary" primary={true} iconClassName="muidocs-icon-action-home" />
            </div>
        )
    }
});

module.exports = FloatingActionsMenu;
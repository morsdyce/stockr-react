'use strict';

describe('StockrApp', function () {
  var React = require('react/addons');
  var StockrApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    StockrApp = require('components/StockrApp.js');
    component = React.createElement(StockrApp);
  });

  it('should create a new instance of StockrApp', function () {
    expect(component).toBeDefined();
  });
});
